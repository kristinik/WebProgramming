import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import dataCard from "../Icons/dataCard";
import {
    PriceSection,
    SectionWrapper,
    StyledButtons,
    StyledImage,
    StyledRightSection,
    StyledText,
    SeatsSelection
} from "./ShowStadium.styled";
import { Button, InputNumber, Select } from "antd";
import "./ShowStadium.styled";

function ShowStadium() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [stadium] = useState(dataCard.find((stadium) => stadium.id === parseInt(id)));
    const [stadiumCount, setStadiumCount] = useState(1);
    const [section, setSection] = useState("Section 1");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const cartItems = useSelector(state => state.cart.cartItems);

    if (!stadium) {
        return <div>Stadium not found</div>;
    }

    // Отримуємо кількість доступних місць для вибраної секції
    const getAvailableSeats = (selectedSection) => {
        const sectionInfo = stadium.sections.find(sec => sec.name === selectedSection);
        return sectionInfo ? sectionInfo.availableSeats : 0;
    };

    const handleGoBack = () => {
        navigate("/catalog");
    };

    const handleAddToCart = () => {
        const existingItem = cartItems.find(item => item.id === stadium.id && item.selectedSection === section);
        if (existingItem) {
            dispatch(addToCart(
                cartItems.map(item =>
                    item.id === stadium.id && item.selectedSection === section
                        ? { ...item, quantity: item.quantity + stadiumCount }
                        : item
                )
            ));
        } else {
            dispatch(addToCart([...cartItems, { ...stadium, quantity: stadiumCount, selectedSection: section }]));
        }

        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    return (
        <SectionWrapper>
            <StyledImage>
                <img src={stadium.image} alt={stadium.title} />
            </StyledImage>
            <StyledRightSection>
                <h1>{stadium.title}</h1>
                <StyledText>{stadium.text}</StyledText>
                <PriceSection>
                    <h5 style={{ marginRight: "20px" }}>Price:</h5>
                    ₴{stadium.price}
                </PriceSection>

                <SeatsSelection style={{ marginTop: "-20px" }}>
                    <h3>Ticket:</h3>
                    <InputNumber
                        min={1}
                        max={getAvailableSeats(section)} // Встановлюємо максимальну кількість відповідно до доступних місць
                        value={stadiumCount}
                        onChange={setStadiumCount}
                    />
                    <Button type="primary" onClick={() => setStadiumCount(1)}>Reset</Button>
                </SeatsSelection>

                <SeatsSelection style={{ marginTop: "-20px" }}>
                    <h3>Select Section:</h3>
                    <Select
                        value={section}
                        onChange={(value) => {
                            setSection(value);
                            setStadiumCount(1); // Скидаємо кількість квитків при зміні секції
                        }}
                        style={{ width: "40%" }}
                    >
                        {stadium.sections.map(sec => (
                            <Select.Option key={sec.name} value={sec.name}>
                                {sec.name} (Available: {sec.availableSeats}) {/* Показуємо доступні місця */}
                            </Select.Option>
                        ))}
                    </Select>
                    <Button type="primary" onClick={() => setSection("Section 1")}>Reset</Button>
                </SeatsSelection>

                {showSuccessMessage && (
                    <div className="success-message">
                        Stadium successfully added to cart!
                    </div>
                )}

                <StyledButtons>
                    <Button style={{ marginTop: "20px", width: "170px" }} onClick={handleGoBack}>
                        Go Back to Catalog
                    </Button>
                    <Button
                        style={{ marginTop: "20px", width: "170px" }}
                        onClick={handleAddToCart}
                        disabled={stadiumCount > getAvailableSeats(section)} // Забороняємо додавання, якщо кількість перевищує доступні місця
                    >
                        Add to Cart
                    </Button>
                </StyledButtons>
            </StyledRightSection>
        </SectionWrapper>
    );
}

export default ShowStadium;
