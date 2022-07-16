import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard";
import { Home } from "@/pages/Home";

import { createClient, Provider } from "urql";
import styled from "styled-components";

const client = createClient({
    url: "/graphql",
});

export const App = () => {
    return (
        <Provider value={client}>
            <AppWrapper>
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Home />}></Route>
                            <Route
                                path="event/:id"
                                element={<Dashboard />}
                            ></Route>
                        </Route>
                    </Routes>
                </BrowserRouter>

                <AppFooter>Waffle Hacks Backend Challenge</AppFooter>
            </AppWrapper>
        </Provider>
    );
};

const AppWrapper = styled.div`
    max-width: 40rem;
    padding: 0 1rem;
    margin: 0 auto;
`;

const AppFooter = styled.footer`
    padding: 2rem 0;
    color: #666;
`;
