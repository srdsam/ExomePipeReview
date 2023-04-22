import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { clinvar } from '../services/clinvar.service';
import Button from 'react-bootstrap/Button'

/*
 * Clinvar Component which calls the ClinVar API for a specific gene
 * Used this => https://clinicaltables.nlm.nih.gov/apidoc/variants/v4/doc.html
 */

class Clinvar extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isShow: false,
            user: {},
            data: [],
            geneID: this.props.geneID
        };
    }

    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            data: { loading: true }
        });

    }
    
    toggleShow = () => {
        const { geneID } = this.state

        clinvar.getClinVar(geneID.text).then(data => {
            this.setState({ data })
            this.setState(state => ({ isShow: !state.isShow }));
        })

    };
    
    render() {
        const { data } = this.state;
        // Clinvar API Returns: AminoAcidChange,Chromosome,GeneSymbol,phenotype,NucleotideChange

    return (
        <div>
            <div style={{ justifyContent: "center"}}>
            <Button variant="info" onClick={this.toggleShow} type="button">
                Clinvar API Results for Gene
            </Button>
            </div>
        {this.state.isShow ? 
            <div>
                <h2>Clinvar Results</h2>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Variant</th>
                            <th>Effect Type</th>
                            <th>AA Change</th>
                            <th>Phenotype</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data[3].map((value, index) => (
                        <tr>
                            <td>{value[4]}</td>
                            <td>{value[5]}</td>
                            <td>{value[0]}</td>
                            <td>{value[3]}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            : 
            null
            }

        </div>
    );
    }
}

export { Clinvar };

