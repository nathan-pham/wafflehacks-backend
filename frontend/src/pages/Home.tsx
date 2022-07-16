import { H, P, Div, Button } from "@/styles/atoms";
import { Events } from "@/components/Events";
import { gql, useMutation } from "urql";

export const Home = () => {
    const [createEventResults, createEvent] = useMutation(createEventMutation);

    return (
        <>
            <H $mtVeryLarge>🧇 Waffle Hacks Challenge</H>
            <P $mt>
                Simple CRUD to manage events. Made with a Python backend
                (GraphQL, SQLAlchemy, SQLite) and React.js frontend (Styled
                Components. React Router).
            </P>

            <H $mtLarge as="h2">
                Events
            </H>
            <P $mt>A list of all of the events you've created.</P>
            <Events />
        </>
    );
};

const createEventMutation = gql`
    mutation ($name: String!, $description: String!) {
        createEvent(name: $name, description: $description) {
            id
            name
            description
        }
    }
`;
