import { H, P, Button, Div } from "@/styles/atoms";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { gql, useQuery, useMutation } from "urql";
import { useState } from "react";

export const defaultEvent = {
    name: "Untitled Event",
    description: "This event doesn't have a description!",
};

export const Events = () => {
    const [events] = useQuery({ query: getEvents });
    const [createEventResults, createEvent] = useMutation(createEventMutation);

    const [cacheEvents, setCacheEvents] = useState<Record<string, string>[]>(
        events.data?.getEvents || []
    );

    return (
        <>
            <Button
                $mt
                onClick={async () => {
                    await createEvent(defaultEvent);
                    setCacheEvents([...cacheEvents, defaultEvent]);
                }}
            >
                Create Event
            </Button>

            <Div $mtLarge>
                {!events.fetching &&
                    events.data.getEvents.map(
                        (event: Record<string, string>, i: number) => (
                            <Link
                                className="reset"
                                to={`/event/${event.id}`}
                                key={i}
                            >
                                <Event>
                                    <H as="h3">{event.name}</H>
                                    <P $mt>{event.description}</P>
                                </Event>
                            </Link>
                        )
                    )}
            </Div>
        </>
    );
};

const Event = styled.div`
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    padding: 1rem;
    cursor: pointer;
    margin-top: 1rem;
`;

// queries
const getEvents = gql`
    query {
        getEvents {
            id
            name
            description
        }
    }
`;

const createEventMutation = gql`
    mutation ($name: String!, $description: String!) {
        createEvent(name: $name, description: $description) {
            id
            name
            description
        }
    }
`;
