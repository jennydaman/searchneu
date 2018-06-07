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
import share from './share.svg';

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

    this.closeForm = this.closeForm.bind(this);
    this.onAndroidShareClick = this.onAndroidShareClick.bind(this);

    this.initialize();
  }

  componentDidMount() {
    macros.log("componentDidMount rfere modal")
    this.setState({
      isOpen: true
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

  // Android 
  onAndroidShareClick() {
    window.navigator.share({
      title: 'Yo dude, check out Search NEU',
      text: 'its lit yo',
      url: 'https://searchneu.com/referred_from/' 
    })

  }


  // If navigator.share, return one button that just calls navigator.share.
  // else, return a couple buttons - one for fb, fbmessenger,, email, link
  getShareElements() {

  }

  render() {
    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1 },
      exited: { display: 'none', opacity: 0 },
    };

    let element = null;

    // Return the share thing
    if (window.navigator.share || 1) {
      element = <Button size='big' basic className="android-share-button" onClick={this.onAndroidShareClick}>
                  <img src={share} className="share-img"/>
                  {/*<Icon disabled name='share alternate' />*/}
                  <span className="text">Share!</span>
                </Button>


    //  {/*<Button basic onClick={this.onAndroidShareClick}><img src={share}/>Share!</Button>*/}
    }

    return (
      <div className='referModal-container'>
        <Modal open={ this.state.isOpen } onClose={ this.closeForm } size='small' className='refer-modal-container'>
          <Header icon='mail' content='Refer your friends for priority notifications!' />
          <Modal.Content className='formModalContent'>
              <div className='feedbackParagraph'>Share Search NEU with your friends and get priority notifications!</div>


              <br/>
              {element}
              <br/>


              <div className="copy-text">
                <span>Or copy your share link:&nbsp;&nbsp;</span>
                <Button basic><Icon disabled name='copy'/>copy</Button>
              </div>
              <br/>

              {/*When a popular class fills up, many students subscribe for notifications for the same */}

              When a popular class fills up, many students usually subscribe for notifications on the same class. Share Search NEU with your friends to get notified first! We'll send you the notification 1 hour earlier for every friend you refer to the site.


              {/*Sometimes, many students are subscribed to the same class. */}
{/*
              For every friend you refer, we'll send the no

              Some languge down here that explains what is going on omg how awesme is this feature.*/}

{/*
              Send on messenger, url share, facebook, other (twitter, email, etc)


              // clipboard https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript


              on mobile the order should be;
               - facebook messenger
               - instagram direct
               - sms (if there is room + it looks good)
               - copy the url
               - other (on android this can bring up the share dialog, on ios.... maybe add a bunch of more links tothe bottom?)


              url: https://searchneu.com/referred_from/idhere

              this works pretty well when the user is on mobile and has messenger installed
              <a target='_blank'
                rel='noopener noreferrer'
                 href={"fb-messenger://share/?link=https%3A%2F%searchneu.com%referred_from%2F" + 'idhere' + "&app_id=1979224428978082"}>Send In Messenger</a>

              this works pretty well when people are on web

              <a target='_blank'
                rel='noopener noreferrer'
                 href="mailto:?subject=Search NEU&body=Hey,%0D%0A%0D%0ANot sure if you've heard of it, but if you haven't check out %3Ca%20href%3D%22https%3A%2F%2Fsearchneu.com%22%3ESearch%20NEU%3C%2Fa%3E - it's a great site for class information at NEU. https://searchneu.com">Send via email</a>
              https://developers.facebook.com/docs/sharing/reference/send-dialog

              // for sharing on android mobile

              https://developers.google.com/web/updates/2016/09/navigator-share


              // insert the user's name at the bottom of this email. 


              email link
              you should be able to prefill body and subject here*/}
          </Modal.Content>
          <Modal.Actions>
            <Button basic onClick={ this.closeForm }>
              <Icon name='checkmark' />
                Done
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ReferModal;
