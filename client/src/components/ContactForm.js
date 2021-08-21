import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';



const ContactForm = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [result, setResult] = useState(null);

    const sendEmail = event => {
        event.preventDefault();
        axios
            .post('/send', { ...state })
            .then(response => {
                setResult(response.data);
                setState({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            })
            .catch(() => {
                setResult({
                    success: false,
                    message: 'Something went wrong. Try again later'
                });
            });
    };

    const onInputChange = event => {
        const { name, value } = event.target;

        setState({
            ...state,
            [name]: value
        });
    };

    return (
        <div>
            {result && (
                <p className={`${result.success ? 'success' : 'error'}`}>
                    {result.message}
                </p>
            )}
            <form onSubmit={sendEmail}>
                <Form.Group controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={state.name}
                        placeholder="Enter your full name"
                        onChange={onInputChange}
                        required='Please enter your first and last name'
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        value={state.email}
                        placeholder="Testing Purposes only, you can enter a fake email"
                        onChange={onInputChange}
                        required='You provide your email'
                    />
                </Form.Group>
                <Form.Group controlId="subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        type="text"
                        name="subject"
                        value={state.subject}
                        placeholder="Enter subject"
                        onChange={onInputChange}
                        required='please add a message'
                    />
                </Form.Group>
                <Form.Group controlId="subject">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="message"
                        value={state.message}
                        rows="3"
                        placeholder="optional: Enter a message"
                        onChange={onInputChange}

                    />
                </Form.Group>
                <Button className="sub" variant="success" type="submit">
                    Submit
                </Button>
            </form>

            <footer>Thank you for Visiting, if you choose to provide an email, we will not use it for anything other than testing purposes, you can simply provide a fake email, it is not testing for a valid email, just testing to see if a form submission will transmit the new contact info via email, and NPM: nodemailer</footer>
        </div>
    );
};

export default ContactForm;