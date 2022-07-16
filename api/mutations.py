from api.models import Event, Attendee, EventAttendance
from api import db

import ariadne as gql

def createAttendee(obj, info, **kwargs):
    attendee = Attendee(**kwargs)
    db.session.add(attendee)
    db.session.commit()
    return attendee

def updateAttendee(obj, info, **kwargs):
    attendee = Attendee.query.get(kwargs.get("id"))
    attendee.update(**kwargs)
    db.session.commit()
    return attendee

def createEvent(obj, info, **kwargs):
    event = Event(**kwargs)
    db.session.add(event)
    db.session.commit()
    return event

def updateEvent(obj, info, **kwargs):
    event = Event.query.get(kwargs.get("id"))
    event.name = kwargs.get("name")
    event.description = kwargs.get("description")
    db.session.commit()
    return event

def deleteEvent(obj, info, **kwargs):
    event = Event.query.get(kwargs.get("id"))
    db.session.delete(event)
    db.session.commit()
    return event

def createEventAttendee(obj, info, **kwargs):
    event_id, attendee_id = kwargs.get("eventId"), kwargs.get("attendeeId")
    event = Event.query.get(event_id)
    event.attendance.append(EventAttendance(event_id, attendee_id, False))
    db.session.commit()
    return event

def updateEventAttendee(obj, info, **kwargs):
    event_id, attendee_id, here = kwargs.get("eventId"), kwargs.get("attendeeId"), kwargs.get("here")
    event = Event.query.get(event_id)
    event.attendance.filter_by(attendee_id=attendee_id).update({ "here": here })
    db.session.commit()
    return event

def deleteEventAttendee(obj, info, **kwargs):
    event_id, attendee_id = kwargs.get("eventId"), kwargs.get("attendeeId")
    event = Event.query.get(event_id)
    event.attendance.filter_by(attendee_id=attendee_id).delete()
    db.session.commit()
    return event

resolvers = {
    "createAttendee": createAttendee,
    "updateAttendee": updateAttendee,

    "createEvent": createEvent,
    "updateEvent": updateEvent,
    "deleteEvent": deleteEvent,

    "createEventAttendee": createEventAttendee,
    "updateEventAttendee": updateEventAttendee,
    "deleteEventAttendee": deleteEventAttendee
}

mutation = gql.ObjectType("Mutation")
for name, resolver in resolvers.items():
    mutation.set_field(name, resolver)