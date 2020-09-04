import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import alarm from "./media/alarm.mp3"

class Clock extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            minutes: 25,
            seconds: 0,
            pause: 5,
            session: 25,
            clock: "25:00",
            counting: false,
            isSession: true,
            clockTitle: "Session"
        }
        this.interval = null
    }
    reset = () => {
        if(this.interval !== null){
            clearInterval(this.interval)
        }
        this.setState({
            minutes: 25,
            seconds: 0,
            pause: 5,
            session: 25,
            counting: false,
            isSession: true,
            clockTitle: "Session"
        })
        document.querySelector("#beep").pause()
        document.querySelector("#beep").currentTime = 0
    }

    decBreak = () => {
        const {pause} = this.state
        if(pause > 1 && !this.state.counting){
            this.setState({
                ...this.state,
                pause: pause -1
            })
        }
    }
    incBreak = () => {
        const {pause} = this.state
        if(pause < 60 && !this.state.counting){
            this.setState({
                ...this.state,
                pause: pause +1
            })
        }
    }
    decSession = () => {
        const {session} = this.state
        if(session > 1 && !this.state.counting){
            const temp = session - 1
            this.setState({
                ...this.state,
                session: temp,
                minutes: temp
            })
        }
    }
    incSession = () => {
        const {session} = this.state
        if(session < 60 && !this.state.counting){
            const temp = session + 1
            this.setState({
                ...this.state,
                session: temp,
                minutes: temp
            })
        }
    }

    triggerAlarm = () => {
        document.querySelector("#beep").play()
    }

    timer = () => {
        this.interval = setInterval(()=>{
            let {seconds, minutes, clockTitle, isSession, pause, session} = this.state
            let second = seconds -1
            if(second < 0){
                if(minutes === 0){
                    if(isSession){
                        clockTitle = "Break"
                        isSession = false
                        minutes = pause
                        second = 0
                    }
                    else{
                        clockTitle = "Session"
                        isSession = true
                        minutes = session
                        second = 0
                    }
                    this.triggerAlarm()
                }
                else{
                    minutes -= 1
                    second = 59
                }
            }
            this.setState(() => ({
                ...this.state,
                seconds: second,
                minutes: minutes,
                clockTitle,
                isSession,
                pause,
                session
            }))
        },1000)
    }

    countdown = () => {
        const {counting} = this.state
        if(!counting){
            this.timer()
        }
        else{
            clearInterval(this.interval)
        }
        this.setState({
            ...this.state,
            counting: !counting
        })
    }

    render(){
        const {pause, session, clockTitle, minutes, seconds} = this.state
        return (
            <Container fluid>
                <Row className="text-center title">
                    <Col>
                        <h1 className="">POMODORO CLOCK</h1>
                    </Col>
                </Row>
                <Row className="content">
                    <Col md={{span:6, offset: 3}}>
                        <Card
                            border="light"
                            className="pom-card"
                        >
                            <div className="settings">
                                <div className="break h3">
                                    <div className="break-title" id="break-label">
                                        Break Length
                                    </div>
                                    <div className="break-content">
                                    <i className="fas fa-arrow-down pointer" id="break-decrement" onClick={this.decBreak}></i>
                                        <div id="break-length">{pause}</div>
                                        <i className="fas fa-arrow-up pointer" id="break-increment" onClick={this.incBreak}></i>
                                    </div>
                                </div>
                                <div className="session h3">
                                    <div className="session-title" id="session-label">
                                        Session Length
                                    </div>
                                    <div className="session-content">
                                        <i className="fas fa-arrow-down pointer" id="session-decrement" onClick={this.decSession}></i>
                                        <div id="session-length">{session}</div>
                                        <i className="fas fa-arrow-up pointer" id="session-increment" onClick={this.incSession}></i>
                                    </div>
                                </div>
                            </div>
                            <div className="clock-player">
                                <div className="clock h3">
                                    <div className="clock-title" id="timer-label">{clockTitle}</div>
                                    <div className="timer" id="time-left">
                                        {
                                            String(minutes).padStart(2,'0') + ":" + String(seconds).padStart(2,'0')
                                        }
                                    </div>
                                </div>
                                <div className="controls h3">
                                <i className="fas fa-play pointer" id="start_stop" onClick={this.countdown}></i>
                                    <i className="fas fa-sync pointer" id="reset" onClick={this.reset}></i>
                                </div>
                                <div>
                                <audio src={alarm} className="clip" id="beep" type="audio/mp3" preload="auto" />
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Clock