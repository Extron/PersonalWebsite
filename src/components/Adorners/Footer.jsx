import React, { Component } from "react";
import styled from "styled-components";

import { footer } from "../../../data/SiteConfig";

const Foot = styled.footer.attrs({
    className: "footer"
})`
    justify-content: center;
    align-content: center;
    background-color: ${props => props.theme.colors.secondary};
    padding: 8px;

    > .notice-container {
        display: flex;
        align-content: center;
        align-items: center;

        > .copyright {
            display: flex;
            flex: 1;
            justify-content: flex-start;

            @media (max-width: 640px) {
                justify-content: center;
            }
        }

        > h4 {
            color: ${props => props.theme.colors.textDark};
            text-align: center;
            margin: 0;
        }
    }
`;

export default class Footer extends Component {
    render() {
        return (
            <Foot>
                <div className="notice-container">
                    <div className="copyright">
                        <h4>{footer.copyright}</h4>
                    </div>
                </div>
            </Foot>
        );
    }
}
