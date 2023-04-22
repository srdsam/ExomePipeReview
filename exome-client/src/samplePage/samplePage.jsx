import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

import Select from 'react-select';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { Navibar } from '../component/Navibar';
import { Clinvar } from '../component/Clinvar'

import { api } from '../services/api.service';
import { parse } from '../helpers/exomiser-parser';
import { Vep } from '../component/Vep';

class SamplePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: [],
            proband: {},
            data: [],
            genes: [],
            showElem: [],
            reviewStatus: [],
            geneList: [],
            ACMG: []
        };
    }

    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            users: { loading: true },
            proband: window.location.pathname.split(':')[1],
            isLoading: true,
            data: { loading: true },
            genes: [],
            showElem: [],
            reviewStatus: JSON.parse(localStorage.getItem('reviewStatus' + this.state.proband)) || [],
            geneList: JSON.parse(localStorage.getItem('geneList' + this.state.proband)) || [],
            ACMG: "UNK"
        });

        console.log(JSON.parse(localStorage.getItem('reviewStatus')))

        // Retrieves analysis which is used throughout code
        api.getProbandById(window.location.pathname.split(':')[1]).then(data => {
            const { genes, raw } = parse(data);
            this.setState({ data: genes })
            this.setState({ isLoading: false})
        })

        // Retrieves genes which are used in Select component 
        api.getGenes(window.location.pathname.split(':')[1]).then(data => {
            this.setState({ genes: data})
            this.setState({ showElem: Array(data.length).fill(false) })
            if (!this.state.reviewStatus){
                this.setState({ reviewStatus: Array(data.length).fill("Incomplete") })
            }
        })

    }

    // Ensures that only the selected gene is displayed
    showGene(label, value) {
        let tempArr = Array(this.state.showElem.length).fill(false)

        tempArr[value] = true

        this.setState({ showElem: tempArr })
    }

    // Updates the review status in the Select component
    updateReviewStatus(val, i) {
        let tempArr = this.state.reviewStatus

        tempArr[i] = val

        localStorage.setItem('reviewStatus' + this.state.proband, JSON.stringify(tempArr))

        this.setState({ reviewStatus: tempArr })
    }

    // Updates the list of likely causative variants for the report
    updateGeneList(value, i, gene, proband) {
        let tempArr = this.state.geneList

        let index = this.state.showElem.indexOf(true)

        tempArr.push({
            Family_ID: "UNK",
            Individual_ID: "UNK",
            Sample_ID: this.state.proband,
            Gene: this.state.genes[index].text,
            Ensembl_ID: value.transcriptAnnotations[0].accession,
            Variant: `${value.chromosomeName}:${value.position}:${value.ref}:${value.alt}`,
            Inheritance: value.contributingInheritanceModes.join(", "),
            OMIM_Name: this.state.data[index].OMIM.map(val => val.diseaseName).length > 0 ? this.state.data[index].OMIM.map(val => val.diseaseName).join(", ") : "No Results",
            OMIM_ID: this.state.data[index].OMIM.map(val => val.diseaseId).length > 0 ? this.state.data[index].OMIM.map(val => val.diseaseId).join(", ") : "No Results",
            cDNA: value.transcriptAnnotations[0].hgvsCdna,
            Protein: value.transcriptAnnotations[0].hgvsProtein,
            ACMG: this.state.ACMG,
        })

        console.log(tempArr)

        localStorage.setItem('geneList' + this.state.proband, JSON.stringify(tempArr))

        this.setState({ geneList: tempArr })
    }

    // Allows client to add ACMG data to report
    handleAcmgOnChange(e) {
        this.setState({
          ACMG: e.target.value
        });
      }

    // Generates report from geneList variable
    generateReport() {
        const { geneList, proband } = this.state

        console.log("Clicked")

        const data = geneList
        const fileName = proband

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(dataBlob, fileName + fileExtension);
    }

    render() {
        const { proband, data, isLoading, genes, showElem, reviewStatus, geneList, ACMG } = this.state;

        return (

            <div>

                <Navibar></Navibar>

                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Button onClick={(e) => this.generateReport()}>
                    Generate Report
                </Button>
                </div>

                <div>
                    <h1 style={{ fontSize: "50px" }}>Proband - <i style={{ fontSize: "50px" }}>{proband.toString()}</i></h1>
                </div>

                <br></br>
                <Select defaultMenuIsOpen={true} options={genes.map((val, index) => ({ label: val.text + " [Review of Gene: " + reviewStatus[index] + "]", value: index }))} onChange={opt => this.showGene(opt.label, opt.value)}/>
                <br></br>
                {isLoading && 
                    <Spinner animation="border" role="status" variant="primary" size="lg">
                    <span className="sr-only">Loading...</span>
                    </Spinner>
                }
                {!isLoading &&
                    data.map((value, index) => (
                        <div>
                            {showElem[index] &&
                            <div className="jumbotron jumbotron-fluid" key={genes[index]}>
                                <div className="container">
                                    <h1>{value.name}</h1>
                                    <div className="row">
                                        <div className='col-md-8'>
                                            <div><h2>Inheritance of Gene:</h2>{value.compatibleInheritanceModes.map((value, index) => (
                                                <div><li>{value}</li></div>
                                            ))}</div>
                                            <br></br>

                                            {console.log(value)}

                                            {value.OMIM.length>0 &&

                                                <div><h2>OMIM Associated Diseases:</h2>{value.OMIM.map((value, index) => (
                                                    <div>
                                                        <li>{value.diseaseName}</li>
                                                    </div>
                                                ))}</div>
                                            }
                                            <br></br>
                                            {value.HiPhive.length>0 &&
                                                <div><h2>HiPhive Results:</h2>{value.HiPhive.map((value, index) => (
                                                    <div>
                                                        <h3 style={{ fontSize: "12px"}}>Organism: {value.model.organism}</h3>
                                                        <div>Model Score: {value.score}</div>
                                                        {value.model.diseaseTerm &&
                                                            <div>
                                                                Disease Term: {value.model.diseaseTerm}
                                                            </div>
                                                                }
                                                        {value.bestModelPhenotypeMatches &&
                                                            value.bestModelPhenotypeMatches.map((value, index) => (
                                                                <div>
                                                                    Matched Phenotype: {JSON.stringify(value.match.label)}
                                                                </div>
                                                            ))}
                                                    </div>
                                                ))}</div>}
                                            <br></br>
                                            {value.variantEvaluations.map((value, index) => (
                                                <div>
                                                    <Vep chromosome={value.chromosomeName} hgsvG={value.transcriptAnnotations[0].hgvsGenomic} hgsvC={value.transcriptAnnotations[0].hgvsCdna} accession={value.transcriptAnnotations[0].accession} />
                                                    <br></br>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='col-md-4'>
                                            <h2>Exomiser Scores:</h2>
                                            <p style={{ textAlign: "left" }}>Variant Score: {value.variantScore}</p>
                                            <p style={{ textAlign: "left" }}>Priority Score: {value.priorityScore}</p>
                                            <p style={{ textAlign: "left" }}>Combined Score: {value.combinedScore}</p> 
                                            <br></br>
                                            <Clinvar geneID={genes[index]}/>
                                            <br></br>
                                            <div>
                                                ACMG Intepretation to add to Report for Selected Variant
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1">ACMG: </span>
                                                </div>
                                                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" value={ACMG} onChange={ (e) => this.handleAcmgOnChange(e) } aria-describedby="basic-addon1"></input>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row"> 
                                    <div className='col-md-12'>
                                        <h2>Variants Analysis by Exomiser</h2>
                                        <Table striped bordered hover variant="dark">
                                            <thead>
                                                <tr>
                                                    <th>Variant</th>
                                                    <th>Effect Type</th>
                                                    <th>Variant Score</th>
                                                    <th>Phred Score</th>
                                                    <th>Frequency Score</th>
                                                    <th>Frequency Sources</th>
                                                    <th>Transcript Annotations</th>
                                                    <th>Pathogenecity Data</th>
                                                    <th>Add to Report</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {value.variantEvaluations.map((value, index) => (
                                                <tr>
                                                    <td style={{ maxWidth: "20px", wordWrap: "break-word" }}>{value.chromosomeName}:{value.position}:{value.ref}:{value.alt}</td>
                                                    <td>{value.variantEffect}</td>
                                                    <td>{value.variantScore}</td>
                                                    <td>{value.phredScore}</td>
                                                    <td>{value.frequencyScore}</td>
                                                    <td style={{ maxWidth: "200px"}}>{value.frequencyData.knownFrequencies.map((value, index) => (
                                                        <div>{value.source} : {value.frequency}</div>
                                                    ))}</td>
                                                    <td style={{ columnSpan: "50px", maxWidth: "250px", wordWrap: "break-word"}}>{value.transcriptAnnotations.map((value, index) => (
                                                        <li>
                                                            {value.hgvsCdna}: {value.variantEffect} ({value.accession}) <br></br>
                                                        </li>
                                                    ))}</td>
                                                    <td>
                                                        {value.pathogenicityData.clinVarData.empty &&
                                                            <div>No Clinvar Results</div>
                                                        }
                                                        {!value.pathogenicityData.clinVarData.empty &&
                                                            <div>
                                                                Review Status: {value.pathogenicityData.clinVarData.reviewStatus}
                                                                <br></br>
                                                                Intepretation: {value.pathogenicityData.clinVarData.primaryInterpretation}
                                                            </div>
                                                        }
                                                        <br></br>
                                                        {value.pathogenicityData.mostPathogenicScore &&
                                                            value.pathogenicityData.predictedPathogenicityScores.map((value, index) => (
                                                                <div>
                                                                    source: {value.source}
                                                                    <br></br>
                                                                    score: {value.score}
                                                                </div>
                                                            ))}                                                    
                                                        
                                                    </td>
                                                    <td>
                                                    <Button onClick={(e) => this.updateGeneList(value, index, value.transcriptAnnotations[0].geneSymbol)}>
                                                        Add
                                                    </Button>
                                                    </td>

                                                </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                                        <Button onClick={(e) => this.updateReviewStatus("Complete", index)}>
                                            Gene Reviewed
                                        </Button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    ))
                }
            </div>
        );
    }
}

export { SamplePage };
