import React from 'react';
import { Link } from 'react-router-dom';
import { Navibar } from '../component/Navibar'
import Table from 'react-bootstrap/Table';

import { api } from '../services/api.service';
import { userService } from '../services/user.service';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: [],
            probands: [],
            phenotypes: [],
        };
    }

    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            users: { loading: true },
            probands: { loading: true },
            phenotypes: []
        });

        userService.getAll().then(users => this.setState({ users }));

        // Retrieves data which is used in Table 
        api.getProbands().then(probands => {
            this.setState({ probands })
            for (var i = 0; i < probands.length; i++)
                api.getPheno(JSON.stringify(probands[i].proband)).then(pheno => {
                    this.setState(prevState => ({
                        phenotypes: [...prevState.phenotypes, [...pheno]]
                      }));
                })
        });
    }

    render() {
        const { user, users, probands, phenotypes } = this.state;
        return (
            <div>
            <Navibar></Navibar>
            
            <div className="col-md-6 col-md-offset-0">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React & Basic HTTP Authentication!!</p>
            </div>
            <div className="col-md-12 col-md-offset-0">
            <h3>Probands from secure api end point:</h3>
            {!probands.loading && 
            <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>#</th>
                <th>Proband</th>
                <th>Phenotype</th>
                <th>Review Proband</th>
                </tr>
            </thead>

            <tbody>
                {probands.map((proband, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{proband.proband}</td>
                        <td>{phenotypes[index]}</td>
                        <td>
                            <a href={window.location.origin.toString()+"/sample/:"+proband.proband}>
                                <div>
                                    View Review Page {"->"}
                                </div>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
            </Table>
            }
            </div>
            </div>
        );
    }
}

export { HomePage };
