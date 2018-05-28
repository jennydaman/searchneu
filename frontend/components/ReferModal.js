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

      // The value of the message box.
      isOpen: false,
    };

    // this.onTextAreaChange = this.onTextAreaChange.bind(this);
    // this.onContactChange = this.onContactChange.bind(this);
    // this.hideMessage = this.hideMessage.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    
    this.closeForm = this.closeForm.bind(this);

    this.initialize();
  }

  componentDidMount() {
    macros.log("componentDidMount rfere modal")
    this.setState({
      isOpen: false
    })
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

  closeForm() {
    this.setState({
      isOpen: false
    })
  }

  render() {
    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1 },
      exited: { display: 'none', opacity: 0 },
    };

    return (
      <div className='feedback-container'>
        <Modal open={ this.state.isOpen } onClose={ this.closeForm } size='small' className='feedback-modal-container'>
          <Header icon='mail' content='Refer your friends for priority notifications!' />
          <Modal.Content className='formModalContent'>
            <Form>
              <div className='feedbackParagraph'>Refer a friend to Search NEU for priority notifications!</div>
              Send on messenger, url share, facebook, other (twitter, email, etc)

              url: https://searchneu.com/referred_from/idhere

              this works pretty well when the user is on mobile and has messenger installed
              <a href="fb-messenger://share/?link=https%3A%2F%searchneu.com%referred_from%2F" + id here + "&app_id=1979224428978082">Send In Messenger</a>

              this works pretty well when people are on web
              https://developers.facebook.com/docs/sharing/reference/send-dialog


              email link
              you should be able to prefill body and subject here

              


              <p>By default this form is anonymous. Leave your name and/or email if you want us to be able to contact you.</p>
              <Input name='contact' form='feedbackForm' className='formModalInput' onChange={ this.onContactChange } />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' onClick={ this.closeForm }>
              <Icon name='remove' />
                Cancel
            </Button>
            <Button type='submit' color='green' form='feedbackForm' onClick={ this.closeForm }>
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
