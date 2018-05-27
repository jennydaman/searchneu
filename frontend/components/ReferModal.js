/*
 * This file is part of Search NEU and licensed under AGPL3.
 * See the license file in the root folder for details.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal, Header, TextArea, Input, Form, Message } from 'semantic-ui-react';
import { Transition } from 'react-transition-group';

import authentication from './authentication';
import macros from './macros';
import request from './request';

// This modal pops up after someone signs up for notifications
// It provides the user with some information that they can use to refer other people to the site (eg. a url, share on FB, etc)

class ReferModal extends React.Component {
  // The bool of whether this modal is open is kept in here.

  constructor(props) {
    super(props);

    this.state = {

      // The value of hte message box.
      isOpen: '',
    };

    // this.onTextAreaChange = this.onTextAreaChange.bind(this);
    // this.onContactChange = this.onContactChange.bind(this);
    // this.hideMessage = this.hideMessage.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    
    this.initialize();
  }
  
  async initialize() {
    
    let facebookApi = await authentication.getFacebookAPI();
    
    facebookApi.Event.subscribe('send_to_messenger', (e) => {
      if (e.event === 'opt_in') {
        macros.log("Opening referral modal.")
        this.setState({
          isOpen: true
        })
      }
    });
  }

  async onSubmit() {

    const response = await request.post({
      url: '/submitFeedback',
      body: {
        message: this.state.messageValue,
        contact: this.state.contactValue,
      },
    });

    if (response.error) {
      macros.error('Unable to submit feedback', response.error, this.state.messageValue, this.state.contactValue);
    }

    this.setState({
      messageVisible: true,
      messageValue: '',
      contactValue: '',
    });

    // Hide the message after 2 seconds
    setTimeout(() => {
      this.setState({
        messageVisible: false,
      });
    }, 2000);

    this.props.closeForm();
  }

  onTextAreaChange(event) {
    this.setState({
      messageValue: event.target.value,
    });
  }

  onContactChange(event) {
    this.setState({
      contactValue: event.target.value,
    });
  }

  hideMessage() {
    this.setState({
      messageVisible: false,
    });
  }

  render() {
    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1 },
      exited: { display: 'none', opacity: 0 },
    };

    return (
      <div className='feedback-container'>
        <Transition in={ this.state.messageVisible } timeout={ 500 }>
          {(state) => {
         return (
           <Message
             success
             className='alertMessage'
             header='Your submission was successful.'
             style={{ ...transitionStyles[state] }}
             onDismiss={ this.hideMessage }
           />
            );
        }}
        </Transition>
        <Modal open={ this.props.feedbackModalOpen } onClose={ this.props.closeForm } size='small' className='feedback-modal-container'>
          <Header icon='mail' content='Search NEU Feedback' />
          <Modal.Content className='formModalContent'>
            <Form>
              <div className='feedbackParagraph'>Find a bug in Search NEU? Find a query that dosen&apos;t come up with the results you were looking for? Have an idea for an improvement or just want to say hi? Drop a line below! Feel free to write whatever you want to and someone on the team will read it.</div>
              <TextArea name='response' form='feedbackForm' className='feedbackTextbox' onChange={ this.onTextAreaChange } />
              <p>By default this form is anonymous. Leave your name and/or email if you want us to be able to contact you.</p>
              <Input name='contact' form='feedbackForm' className='formModalInput' onChange={ this.onContactChange } />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' onClick={ this.props.closeForm }>
              <Icon name='remove' />
                Cancel
            </Button>
            <Button type='submit' color='green' form='feedbackForm' onClick={ this.onSubmit }>
              <Icon name='checkmark' />
                Submit
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ReferModal;
