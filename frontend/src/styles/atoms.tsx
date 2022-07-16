import styled, { css } from "styled-components";

interface marginProps {
    $mt?: boolean;
    $mtLarge?: boolean;
    $mtVeryLarge?: boolean;
    $mr?: boolean;
}

const margin = css`
    margin: 0;

    ${({ $mt }: marginProps) => $mt && `margin-top: 0.75rem;`}
    ${({ $mtLarge }: marginProps) => $mtLarge && `margin-top: 1.5rem;`}
    ${({ $mtVeryLarge }: marginProps) => $mtVeryLarge && `margin-top: 3rem;`}
    ${({ $mr }: marginProps) => $mr && `margin-right: 0.75rem;`}
`;

const padding = css`
    border-radius: 0.25rem;
    outline: none;
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
`;

export const P = styled.p`
    color: #666;
    ${margin}
`;

export const H = styled.h1`
    ${margin}
`;

interface ButtonProps extends marginProps {
    $warning?: boolean;
    $inline?: boolean;
}

export const Button = styled.button`
    ${({ $warning }: ButtonProps) =>
        $warning
            ? `
                border: 1px solid red;
                background-color: red;
                color: #fff;
            `
            : `
                border: 1px solid #ccc;
                background-color: #fff;
                &:hover {
                    border-color: #aaa;
                }`}

    ${padding}
    ${margin}
    
    user-select: none;
    cursor: pointer;
    display: ${({ $inline }: ButtonProps) => ($inline ? "inline" : "block")};
    transition: border-color 100ms ease-in-out;
`;

export const Div = styled.div`
    ${margin}
`;

export const Input = styled.input`
    border: 1px solid #ccc;
    display: block;

    ${padding}
    ${margin}

    transition: border-color 100ms ease-in-out;
`;
