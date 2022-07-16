from api.models import Event, Attendee
from api import db

import ariadne as gql

def getAttendees(obj, info):
    return Attendee.query.all()

def getAttendee(obj, info, **kwargs):
    return Attendee.query.get(kwargs.get("id"))

def getEvents(obj, info):
    return Event.query.all()

def getEvent(obj, info, **kwargs):
    event = Event.query.get(kwargs.get("id"))
    return event

resolvers = {
    "getAttendees": getAttendees,
    "getAttendee": getAttendee,
    "getEvents": getEvents,
    "getEvent": getEvent
}

query = gql.ObjectType("Query")
for name, resolver in resolvers.items():
    query.set_field(name, resolver)