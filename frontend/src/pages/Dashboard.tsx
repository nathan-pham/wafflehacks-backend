import { Button, H, Input, P } from "@/styles/atoms";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { gql, useMutation, useQuery } from "urql";

import { defaultEvent } from "@/components/Events";

export const Dashboard = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [event] = useQuery({
        query: getEventQuery,
        variables: { id: params.id },
    });

    const [deleteEventResult, deleteEvent] = useMutation(deleteEventMutation);
    const [updateEventResult, updateEvent] = useMutation(updateEventMutation);

    const [name, setName] = useState<string>(
        event.data?.getEvent.name || defaultEvent.name
    );
    const [description, setDescription] = useState<string>(
        event.data?.getEvent.description || defaultEvent.description
    );

    return (
        <>
            <H $mtVeryLarge>{name}</H>
            <P $mt>{description}</P>

            <Button
                $mt
                $warning
                onClick={async () => {
                    await deleteEvent({ id: params.id! });
                    navigate("/");
                }}
            >
                Delete
            </Button>

            <H $mtLarge as="h2">
                Edit Event
            </H>
            <P $mt>Configure the title and description of your event.</P>
            <form
                onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();

                    const [name, description] = (
                        e.target as HTMLFormElement
                    ).querySelectorAll("input");

                    await updateEvent({
                        id: params.id!,
                        name: name.value,
                        description: description.value,
                    });

                    setName(name.value);
                    setDescription(description.value);

                    name.value = "";
                    description.value = "";
                }}
            >
                <Input $mt placeholder="Event Name" name="name" />
                <Input $mt placeholder="Event Description" name="description" />
                <Button $mt>Submit</Button>
            </form>

            <H $mtLarge as="h2">
                Attendees
            </H>
            <Button $mt>Create Attendee</Button>
        </>
    );
};

// queries
const getEventQuery = gql`
    query ($id: ID!) {
        getEvent(id: $id) {
            id
            name
            description
            attendance {
                attendee {
                    id
                    name
                    email
                }
            }
        }
    }
`;

const deleteEventMutation = gql`
    mutation ($id: ID!) {
        deleteEvent(id: $id) {
            id
        }
    }
`;

const updateEventMutation = gql`
    mutation ($id: ID!, $name: String!, $description: String!) {
        updateEvent(id: $id, name: $name, description: $description) {
            id
        }
    }
`;
