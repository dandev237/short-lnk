/**
 * Created by Daniel on 18/06/2017.
 */
import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import LinksList from './LinksList';

export default class Link extends React.Component{
    constructor(props) {
        super(props);

        //Bind this since onLogout is not a lifecycle method
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        Accounts.logout();
    }

    onSubmit(e) {
        const url = this.refs.url.value.trim();

        e.preventDefault();

        if(url) {
            Meteor.call('links.insert', url);
            //Links.insert({ url, userId: Meteor.userId() });
            this.refs.url.value = '';
        }
    }


    //We do the routing using the onLogout method
    render() {
        return (
          <div>
              <h1>Your Links</h1>
              <button onClick={this.onLogout}>Logout</button>
              <LinksList/>
              <p>Add Link</p>
              <form onSubmit={this.onSubmit.bind(this)}>
                  <input type="text" ref="url" placeholder="URL"/>
                  <button>Add Link</button>
              </form>
          </div>
        );
    }
}