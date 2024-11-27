import React, { useState } from "react";
import { FrownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, message, Space, Input, InputNumber } from 'antd';
import {
    CardWrapper,
    VerticalLine,
    PriceSection,
    StyledError,
} from "./Catalog.styled";

import useStadiums from "../../hooks/useStadiums"; // Використовуємо хук
import CardItem from "../../components/CardElement/CardItem";
import Loader from "../../components/Loader/Loader";  // Імпортуємо компонент лоадера

const { Search } = Input;

const items = [
    { label: 'Sort by name', key: '1', icon: <UserOutlined /> },
    { label: 'Sort by increasing price', key: '2', icon: <UserOutlined /> },
    { label: 'Sort by decreasing price', key: '3', icon: <UserOutlined /> },
];

const Catalog = () => {
    const [searchStadium, setSearchStadium] = useState('');
    const [sortStadium, setSortStadium] = useState('');
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [loading, setLoading] = useState(false); // Новий стан завантаження

    const { stadiums, error } = useStadiums(searchStadium, sortStadium, minPrice, maxPrice);

    const handleMenuClick = (element) => {
        setSortStadium(element.key);
        message.info(`Sorting by: ₴{element.label}`);  // Додаємо повідомлення про вибір сортування
    };

    const onSearch = (value) => {
        setLoading(true); // Встановлюємо лоадінг перед пошуком
        setSearchStadium(value);

        // Симулюємо затримку для зняття лоадера, наприклад, як для запиту API
        setTimeout(() => setLoading(false), 1000); // Затримка 1 секунда
    };

    return (
        <div>
            <VerticalLine />
            <Space
                wrap
                style={{ display: "flex", justifyContent: "space-evenly" }}
            >
                <Dropdown.Button
                    menu={{ items, onClick: handleMenuClick }}
                    onClick={() => message.info('Choose a sorting method.')}
                >
                    Filter
                </Dropdown.Button>

                <PriceSection>
                    <div style={{ marginRight: "10px" }}>Price:</div>
                    <InputNumber
                        addonBefore="from"
                        addonAfter="₴"
                        value={minPrice}
                        onChange={setMinPrice}
                        min={1}
                        max={maxPrice - 1}
                        style={{ marginRight: "10px" }}
                    />
                    <InputNumber
                        addonBefore="to"
                        addonAfter="₴"
                        value={maxPrice}
                        onChange={setMaxPrice}
                        min={minPrice + 1}
                        max={100000}
                    />
                </PriceSection>

                <Search
                    placeholder="Input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch} // Використовуємо нову функцію onSearch
                />
            </Space>

            <VerticalLine />

            <CardWrapper>
                {loading ? (
                    <Loader /> // Показуємо лоадер під час пошуку
                ) : error ? (
                    <StyledError>
                        <FrownOutlined style={{ fontSize: "150px" }} />
                        <h1>{error}</h1>
                    </StyledError>
                ) : stadiums.length === 0 ? (
                    <StyledError>
                        <FrownOutlined style={{ fontSize: "150px" }} />
                        <h1>No stadiums found.</h1>
                    </StyledError>
                ) : (
                    stadiums.map((item) => (
                        <CardItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            text={item.text}
                            imageSrc={item.image}
                            price={item.price}
                        />
                    ))
                )}
            </CardWrapper>
        </div>
    );
};

export default Catalog;
