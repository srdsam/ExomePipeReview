import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

import { patho } from '../services/vep.service';
import { parseVEP } from '../helpers/vep-parser'

/*
 * VEP Component which calls the VEP API for a specific variants
 * Used this => https://rest.ensembl.org/documentation/info/vep_hgvs_get
 */

class Vep extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
            user: {},
            data: [],
            chromosome: {},
            hgsvG: {},
            clicked: {},
            consequence: {}
        };

    }

    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            data: [],
            dataLoading: true,
            chromosome: this.props.chromosome,
            hgsvG: this.props.hgsvG,
            hgsvC: this.props.hgsvC,
            clicked: false,
            consequence: "Unk",
            accession: this.props.accession
        });

        this.updatePatho = this.updatePatho.bind(this);
    }

    updatePatho = () => {
        const { chromosome, hgsvG, hgsvC, accession, clicked } = this.state

        this.setState({ clicked: true })
        
        patho.getPathogenicity(chromosome, hgsvC, accession).then(data => {
            parseVEP(data).then(( data ) => {
                this.setState({ data: data.results })
                this.setState({ clicked: false })
                this.setState({ consequence: data.consequence })

            })
        }).then(() => {
            this.setState(state => ({ dataLoading: !state.dataLoading }));
        })
    }
    
    render() {
        const { data, dataLoading, clicked, consequence } = this.state;

    return (
        <div>
            <div>
            <Button variant="info" onClick={this.updatePatho} type="button">
                Get variant effect prediction (VEP) by API for {String(this.props.hgsvC).substring(0,15)}
            </Button>

        {!dataLoading &&
            <div>
                <h2>VEP API Results</h2>

                <div>
                    Most Severe Consequence: {consequence.length<1 ? JSON.stringify(consequence) : "Unknown"}
                </div>
                <div>
                    {data.map((value, index) => (
                        <div>
                            {
                            value.exists ?
                            <div>
                                <h3>{index+1}. {value.transcript_id}</h3>
                                {value.most_severe_consequence &&
                                    <li>metaSVM {value.most_severe_consequence}</li>}
                                {Number.isInteger(parseInt(value.sift_score)) &&
                                    <li>SIFT score {value.sift_score} ({value.sift_prediction})</li>}
                                {Number.isInteger(parseInt(value.metaSVM)) &&
                                    <li>metaSVM {value.metaSVM} ({value.metaSVM_prediction})</li>}
                                {Number.isInteger(parseInt(value.polyphen_score)) &&
                                    <li>polyphen_score {value.polyphen_score} ({value.polyphen_prediction})</li>}
                                {Number.isInteger(parseInt(value.cadd_raw)) &&
                                    <li>cadd_raw {value.cadd_raw}</li>}
                                {value.polyphen2_hdiv_score &&
                                    <li>polyphen2_hdiv_score {value.polyphen2_hdiv_score}</li>}
                                {value.metalr_score &&
                                    <li>metalr_score {value.metalr_score} ({value.metalr_prediction})</li>}
                                {!value.metalr_score && !value.polyphen2_hdiv_score && !value.polyphen_score && !value.sift_score && !value.metaSVM &&
                                    <div>
                                        No scores returned from Ensemble REST API.
                                    </div>}
                            </div>
                            :
                            JSON.stringify(value)
                            }
                        </div>
                    ))
                    }
                </div>
            </div>
            }
        </div>
        <div>
        {dataLoading && clicked &&
            <Spinner animation="border" role="status" variant="primary" size="lg">
            <span className="sr-only">Loading...</span>
            </Spinner>
        }
        </div>
        </div>
    );
    }
}

export { Vep };

