import React from 'react';
import { Col, Card, Skeleton } from 'antd';

export const CompanyDisplay = props => {
    if (props.loading) {
        return <Skeleton active />;
    } else {
        const companyMovies = props.movies.map(movie => {
            return (
                <Col key={movie.id} className="item" md={4}>
                    <Card
                        cover={
                            <img
                                alt={movie.title}
                                src={movie.poster}
                            />
                        }
                        onClick={() => props.history.push(`/movie/${movie.id}`)}
                    />
                </Col>
            );
        });

        return companyMovies;
    }
}
