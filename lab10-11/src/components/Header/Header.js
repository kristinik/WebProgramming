import React from "react";
import { StyledHeader, IconsWrapper, IconBase } from "./Header.styled";

import {
    TwitterOutlined,
    GithubOutlined,
    ShoppingCartOutlined,
    InstagramOutlined,
    FacebookOutlined,
    RadarChartOutlined,
} from "@ant-design/icons";

const Header = () => (
    <StyledHeader>
        <div className="logo">
            <IconsWrapper>
                <RadarChartOutlined />
            </IconsWrapper>
            <p>Stadium Shop</p>
        </div>


        <div className="social-icons">
            <IconsWrapper>
                <IconBase><TwitterOutlined /></IconBase>
                <IconBase><GithubOutlined /></IconBase>
                <IconBase><InstagramOutlined /></IconBase>
                <IconBase><FacebookOutlined /></IconBase>
            </IconsWrapper>
        </div>

        <div className="actions">
            <IconsWrapper>
                <ShoppingCartOutlined />
            </IconsWrapper>
        </div>
    </StyledHeader>
);

export default Header;
