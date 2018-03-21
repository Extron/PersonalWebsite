import React from "react";
import styled from "styled-components";

const Carousel = styled.div.attrs({
    className: "image-carousel"
})`
    position: relative;

    > .arrow
    {
        position: absolute;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 1000;
        cursor: pointer;
    }

    > .left-arrow
    {
        left: 16px;
    }

    > .right-arrow
    {
        right: 16px;
    }
`;

const ImageContainer = styled.div.attrs({
    className: "image-container"
})`
    > .image-item
    {
        display: none;
    }

    > .active
    {
        display: inline;
    }
`;

const IndicatorContainer = styled.div.attrs({
    className: "indicators-container"
})`
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    z-index: 1000;

    > .dot
    {
        background: #222;
        display: inline-block;
        border-radius: 50%;
        cursor: pointer;
        padding: 8px;
        margin: 4px;
    }

    > .active
    {
        background: #fff;
    }
`;

export default class ImageCarousel extends React.Component {
    state = {
        currentSlide: 0,
        count: 0
    }

    render() {
        const children = this.props.children.filter(child => typeof child == "object");
        const id = this.props.id;

        this.state.count = children.length;

        return (
            <Carousel>
                {this.renderIndicators()}
                <ImageContainer>
                    {this.renderImages(children)}
                </ImageContainer>
                {this.renderArrow("right")}
                {this.renderArrow("left")}
            </Carousel>
        );
    }

    renderArrow(arrowDir) {
        const isVisible = arrowDir === "right" ? this.state.currentSlide < this.state.count - 1 : this.state.currentSlide > 0;
        const onClick = arrowDir === "right" ? this.nextSlide : this.previousSlide;

        if (isVisible)
        {
            return (
                <div className={`arrow ${arrowDir}-arrow`} onClick={onClick}>
                    <span className={`fa fa-arrow-${arrowDir} fa-2x`}/>
                </div>
            )
        }
        else
        {
            return "";
        }
    }

    renderIndicators() {
        const indicators = [];

        for (let i = 0; i < this.state.count; i++)
            indicators.push(<div key={i} className={`dot ${i == this.state.currentSlide ? "active" : ""}`} onClick={() => this.goToSlide(i)} />);

        return (
            <IndicatorContainer>
                {indicators}
            </IndicatorContainer>
        );
    }

    renderImages(children) {
        return children.map((child, i) => (
            <div key={i} className={`image-item ${i == this.state.currentSlide ? "active" : ""}`}>
                {child}
            </div>
        ))
    }

    nextSlide = () => {
        if (this.state.currentSlide < this.state.count - 1)
            this.setState({ currentSlide: this.state.currentSlide + 1 })
    }

    previousSlide = () => {
        if (this.state.currentSlide > 0)
            this.setState({ currentSlide: this.state.currentSlide - 1 })
    }

    goToSlide = index => {
        this.setState({ currentSlide: index })
    }
}