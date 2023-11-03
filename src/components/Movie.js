import React, { Component } from 'react';
import { Spin } from 'antd';
import { MovieDisplay } from './MovieDisplay'
import logo from '../logo.png';
import '../stylesheets/App.scss';

export default class Movie extends Component {

    state = {
        movie: {},
        loading: true,
        modalVisible: false
    }

    goToHome = () => {
        this.props.history.push(`/`);
    }

    playMovie = () => {
        this.setState({
            modalVisible: true,
        });
    }

    handleCancel = () => {
        this.setState({
            modalVisible: false
        });
    }

    async getMovie(id) {
        const movie = await fetch(`${process.env.REACT_APP_API_URL}movie/${id}`)
            .then(res => res.json());
        this.setState({ movie, loading: false });
    }

    componentDidMount = () => {
        const id = Number(this.props.match.params.id);
        this.getMovie(id);
    }

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    {this.state.loading ? <Spin /> : null}
                    <img src={logo} className="App-logo" alt="logo" onClick={() => this.goToHome()} />
                </header>

                <div className="App-container">
                    <MovieDisplay 
                        loading={this.state.loading} 
                        movie={this.state.movie} 
                        modalVisible={this.state.modalVisible}
                        playMovie={() => this.playMovie()} 
                        handleCancel={() => this.handleCancel()} 
                    />
                </div>
            </div>
        );
    }
}
