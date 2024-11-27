import React, { useState } from "react";
import {
    PriceSection,
    SectionWrapper,
    StyledButtons,
    StyledImage,
    StyledRightSection,
    StyledText,
    SeatsSelection
} from "./ShowStadium.styled";
import { Button, InputNumber } from "antd";
import { NavLink } from "react-router-dom";

const StadiumDisplay = (props) => {
    const [stadiumCount, setStadiumCount] = useState(1);
    const [seatCount, setSeatCount] = useState(1);
    const { stadium } = props;

    return (
        <SectionWrapper>
            <StyledImage>
                <img src={stadium.image} alt="#" />
            </StyledImage>
            <StyledRightSection>
                <h1>{stadium.title}</h1>

                <StyledText>
                    {stadium.text}
                </StyledText>

                <PriceSection>
                    <h5 style={{ marginRight: "20px" }}>
                        Price:
                    </h5>
                    ${stadium.price}
                </PriceSection>

                {/* Вибір кількості стадіонів */}
                <SeatsSelection>
                    <h3>Count of Stadiums to buy:</h3>
                    <InputNumber min={1} max={10} value={stadiumCount} onChange={setStadiumCount} />
                    <Button
                        type="primary"
                        onClick={() => setStadiumCount(1)}
                    >
                        Reset
                    </Button>
                </SeatsSelection>

                {/* Вибір кількості місць */}
                <SeatsSelection>
                    <h3>Number of Seats to Reserve:</h3>
                    <InputNumber min={1} max={stadium.capacity || 1000} value={seatCount} onChange={setSeatCount} />
                    <Button
                        type="primary"
                        onClick={() => setSeatCount(1)}
                    >
                        Reset
                    </Button>
                </SeatsSelection>

                <StyledButtons>
                    <NavLink exact to="/catalog" activeClassName="selected">
                        <Button style={{ marginTop: "20px", width: "170px" }}>GO BACK TO CATALOG</Button>
                    </NavLink>
                    <NavLink exact to="/cart" activeClassName="selected">
                        <Button style={{ marginTop: "20px", width: "170px" }}>ADD TO CART</Button>
                    </NavLink>
                </StyledButtons>
            </StyledRightSection>
        </SectionWrapper>
    );
};

export default StadiumDisplay;