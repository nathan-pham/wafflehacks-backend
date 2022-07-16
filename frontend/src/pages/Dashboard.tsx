import { Button, H, Input, P } from "@/styles/atoms";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { gql, useMutation, useQuery } from "urql";

import { defaultEvent } from "@/components/Events";
import styled from "styled-components";

export const Dashboard = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [event] = useQuery({
        query: getEventQuery,
        variables: { id: params.id },
    });

    const [deleteEventResult, deleteEvent] = useMutation(deleteEventMutation);
    const [updateEventResult, updateEvent] = useMutation(updateEventMutation);
    const [createAttendeeResult, createAttendee] = useMutation(
        createAttendeeMutation
    );

    const [name, setName] = useState<string>(defaultEvent.name);
    const [description, setDescription] = useState<string>(
        defaultEvent.description
    );
    const [attendees, setAttendees] = useState<Record<string, string>[]>([]);

    useEffect(() => {
        if (event.fetching) return;

        setName(event.data?.getEvent.name);
        setDescription(event.data?.getEvent.description);
        setAttendees(event.data?.getEvent.attendance);

        console.log(attendees);
    }, [event.fetching]);

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

                    if (name.value == "" || description.value == "") {
                        return;
                    }

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
            <Button
                $mt
                onClick={async () => {
                    await createAttendee();
                }}
            >
                Create Attendee
            </Button>
            <DashoardTable>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Here</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nathan Pham</td>
                        <td>nathanpham.me@gmail.com</td>
                        <td>No</td>
                        <td style={{ width: "fit-content" }}>
                            <Button $inline $mr>
                                Edit
                            </Button>
                            <Button $inline $warning>
                                Delete
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </DashoardTable>
        </>
    );
};

const DashoardTable = styled.table`
    width: 100%;
    text-align: left;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    margin: 0.75rem 0 0 0;

    th,
    td {
        padding: 0.25rem 0.5rem;
    }
`;

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

const createAttendeeMutation = gql`
    mutation {
        createAttendee(name: "Unnamed Attendee", email: "attendee@email.com") {
            id
            name
            email
        }
    }
`;
