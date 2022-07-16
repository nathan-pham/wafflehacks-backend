from api import db

class Attendee(db.Model):
    __tablename__ = "attendee"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)

    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

    def __repr__(self) -> str:
        return f"<Attendee {self.name}>"

class EventAttendance(db.Model):
    __tablename__ = "event_attendance"

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey("event.id"))
    attendee_id = db.Column(db.Integer, db.ForeignKey("attendee.id"))
    attendee = db.relationship("Attendee", backref=db.backref("attendance", lazy="dynamic"))
    here = db.Column(db.Boolean)

    def __init__(self, event_id: int, attendee_id: int, here: bool):
        self.event_id = event_id
        self.attendee_id = attendee_id
        self.here = here

    def __repr__(self) -> str:
        return f"<EventAttendance {self.event_id} {self.attendee_id} {self.here}>"

class Event(db.Model):
    __tablename__ = "event"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)

    attendance = db.relationship("EventAttendance", backref="event", lazy="dynamic")

    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description

    def __repr__(self) -> str:
        return f"<Event {self.name}>"