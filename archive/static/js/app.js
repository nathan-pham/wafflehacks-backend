import { graphql } from "./graphql.js";
import { $, jsh } from "./jsh.js";

// app state
let events = [];

// create a new event
$("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const eventName = $(e.target, "input[name='name']");
    const eventDescription = $(e.target, "textarea");

    // mutation {
    //     createEvent(name: "Waffle Hacks", description: "Cool hackathon lol") {
    //       id
    //       name
    //     }
    //   }

    if (eventName && eventDescription) {
        // prettier-ignore
        const event = (await graphql(`
                mutation createEvent($name: String!, $description: String!) {
                    createEvent(name: $name, description: $description) {
                        id
                    }
                }
            `,
            {
                name: eventName.value,
                description: eventDescription.value,
            }
        )).data.createEvent;

        events.push({
            id: event.id,
            name: eventName.value,
            description: eventDescription.value,
        });

        renderEvents();

        eventName.value = "";
        eventDescription.value = "";
    }
});

// render app
// render moal
const renderModal = (id, name, description) => {
    $(".modal").forEach((modal) => modal.remove());
};

// render events
const renderEvents = () => {
    $("#events").innerHTML = "";

    if (events.length == 0) {
        $("#events").appendChild(jsh.p({}, "No events found."));
        return;
    }

    events.reverse().forEach(({ name, description, id }) => {
        $("#events").appendChild(
            jsh.div(
                { class: "event" },
                jsh.h3({}, name),
                jsh.p(
                    {},
                    description || "This event doesn't have a description!"
                ),
                jsh.div(
                    {
                        style: {
                            marginTop: "0.75rem",
                            display: "flex",
                            gap: "0.5rem",
                        },
                    },
                    jsh.button(
                        {
                            onClick: async () => {
                                await graphql(
                                    `
                                        mutation deleteEvent($id: ID!) {
                                            deleteEvent(id: $id) {
                                                id
                                            }
                                        }
                                    `,
                                    { id }
                                );

                                events = events.filter(
                                    (event) => event.id !== id
                                );

                                renderEvents();
                            },
                        },
                        "Delete"
                    ),
                    jsh.button({}, "Edit")
                )
            )
        );
    });
};

// render events
events = (
    await graphql(`
        query {
            getEvents {
                id
                name
                description
            }
        }
    `)
).data.getEvents;

renderEvents();
