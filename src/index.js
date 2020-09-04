import React, {useState, useEffect} from 'react'
import ReactDOM from "react-dom"
import "./index.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Card } from 'react-bootstrap'
import {FaArrowDown, FaArrowUp, FaPlay, FaSync} from "react-icons/fa"
import Clock from './Clock';

function Pomodoro() {
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [pause, setPause] = useState(5)
    const [session, setSession] = useState(25)
    const [clock, setClock] = useState("25:00")

    const formatTime = () => {
        let minute = minutes > 10 ? String(minutes) : String(`0${minutes}`)
        let second = seconds > 10 ? String(seconds) : String(`0${seconds}`)
        setClock(`${minute}:${second}`)
    }

    useEffect(()=>{
        let minute = minutes > 10 ? String(minutes) : String(`0${minutes}`)
        let second = seconds > 10 ? String(seconds) : String(`0${seconds}`)
        setClock(`${minute}:${second}`)
    },[minutes,seconds])

    const reset = () => {
        setMinutes(25)
        setSeconds(0)
        setPause(5)
        setSession(25)
        formatTime()
    }

    const decBreak = () => {
        if(pause > 1){
            setPause(pause - 1)
        }
    }
    const incBreak = () => {
        if(pause < 60){
            setPause(pause + 1)
        }
    }
    const decSession = () => {
        if(session > 1){
            const temp = session - 1
            setSession(temp)
            setMinutes(temp)
        }
    }
    const incSession = () => {
        if(session < 60){
            const temp = session + 1
            setSession(temp)
            setMinutes(temp)
        }
    }

    const timer = () => {
        setInterval(()=>{
            let second = seconds -1
            if(minutes > 0){
                if(second < 0){
                    second = 59
                }
                setSeconds(second)
                setMinutes(minutes - 1)
            }
            // formatTime()
        },1000)
    }

    const countdown = () => {
        timer()
    }

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
                                    <div className="pointer" id="break-decrement" onClick={decBreak}>
                                    <FaArrowDown />
                                    </div>
                                    <div id="break-length">{pause}</div>
                                    <FaArrowUp className="pointer" id="break-increment" onClick={incBreak} />
                                </div>
                            </div>
                            <div className="session h3">
                                <div className="session-title" id="session-label">
                                    Session Length
                                </div>
                                <div className="session-content">
                                    <FaArrowDown className="pointer" id="session-decrement" onClick={decSession} />
                                    <div id="session-length">{session}</div>
                                    <FaArrowUp className="pointer" id="session-increment" onClick={incSession} />
                                </div>
                            </div>
                        </div>
                        <div className="clock-player">
                            <div className="clock h3">
                                <div className="clock-title" id="timer-label">Session</div>
                                <div className="timer" id="time-left">
                                    {clock}
                                </div>
                            </div>
                            <div className="controls h3">
                                <FaPlay className="pointer" id="start_stop" onClick={countdown} />
                                <FaSync className="pointer" id="reset" onClick={reset} />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

ReactDOM.render(
    <Clock />,
    document.querySelector("#root")
)
