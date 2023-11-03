import React from 'react';
import { Modal, Tag, Skeleton } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

export const MovieDisplay = props => {
    if (props.loading) {
        return <Skeleton active />;
    } else {

        const autoplay = props.modalVisible ? "autoplay=1" : "autoplay=0";

        return (
            <div className="movie">
                <div className="movie-poster">
                    <img alt={props.movie.title} src={props.movie.poster} />
                    <div className="play-wrapper" onClick={props.playMovie}>
                        <PlayCircleOutlined twoToneColor="#01b9dc"/>
                    </div>
                </div>
                <div className="movie-body">
                    <h1>{props.movie.title}</h1>
                    <Tag color="#01B9DC">{props.movie.company}</Tag>
                    <p>{props.movie.description}</p>
                </div>

                <Modal visible={props.modalVisible}
                    onCancel={props.handleCancel}
                    footer={null}
                    width={"100%"}
                    wrapClassName={"movie-modal"}
                >
                    <iframe src={`${props.movie.video}?${autoplay}&controls=1&showinfo=0&modestbranding=1&autohide=1`} title={props.movie.title} allow="autoplay" frameBorder={0} allowFullScreen />
                </Modal>
            </div>
        );
    }
}
