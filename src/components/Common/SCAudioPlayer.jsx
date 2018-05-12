import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { colors } from "../../../data/SiteTheme";

const Container = styled.div.attrs({
    className: "audio-container"
})`
`;

const Player = styled.iframe.attrs({
    className: "sc-player",
    width: "100%",
    height: "166",
    scrolling: "no",
    frameborder: "no",
    allow: "autoplay"

})`
    border-width: 0px;
`;

export default class SCAudioPlayer extends React.Component {

    static propTypes = {
        trackNumber: PropTypes.string.isRequired,
        secretToken: PropTypes.string,
        color: PropTypes.string
    }

    render() {
        const {
            trackNumber,
            secretToken,
            color
        } = this.props;

        const secTokParam = secretToken != undefined ? `secret_token=${secretToken}` : "";
        const colorParam = color != undefined ? `color=%23${color}` : `color=${colors.primary.replace("#", "%23")}`;

        const url = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackNumber}?${secTokParam}&${colorParam}&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;
        return (
            <Container>
                <Player src={url} />
            </Container> 
        );
    }
}