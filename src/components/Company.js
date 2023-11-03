import React, { Component } from 'react'
import { Row, Spin } from 'antd';
import { CompanyDisplay } from './CompanyDisplay';

import logo from '../logo.png';
import '../stylesheets/App.scss';

export default class Company extends Component {

    state = {
        movies: [],
        loading: true
    }

    goToHome() {
        this.props.history.push(`/`);
    }

    async getCompanyMovies(id) {
        const movies = await fetch(`${process.env.REACT_APP_API_URL}company/${id}`)
            .then(res => res.json());

        this.setState({ movies, loading: false });
    }

    componentDidMount() {
        const company = this.props.match.params.id;

        this.getCompanyMovies(company);
    }

    render() {

        const company = this.props.match.params.id;

        return (
            <div className="App">
                <header className="App-header">
                    {this.state.loading ? <Spin /> : null}
                    <img src={logo} className="App-logo" alt="logo" onClick={() => this.goToHome()} />
                </header>

                <div className="App-container">
                    <div className="company-intro">
                        <div className="company-logo">
                            <img
                                alt={company}
                                src={`${process.env.PUBLIC_URL}/img/companies/logo-${company}.png`}
                            />
                        </div>
                        <div className="company-text">
                            <span>vous présente</span>
                            <span>tout son</span>
                            <span>catalogue</span>
                        </div>
                    </div>

                    <Row gutter={16}>
                        <CompanyDisplay 
                            loading={this.state.loading} 
                            movies={this.state.movies}
                            company={company} 
                            history={this.props.history} 
                        />
                    </Row>
                </div>
            </div>
        );
    }
}
