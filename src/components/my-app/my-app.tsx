import '@ionic/core';
import { Component, Listen, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import createStore from '../../store';

@Component({
  tag     : 'my-app',
  styleUrl: 'my-app.css',
})
export class MyApp {

  @Prop({ context: 'store' }) store: Store;
  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement;

  componentWillLoad() {
    // Only do this once, in the root component
    this.store.setStore(createStore({}));
    // tslint:disable-next-line
    console.log(this.store);
    this.store.getStore().dispatch({ type: 'index/init' });
  }

  /**
   * Handle service worker updates correctly.
   * This code will show a toast letting the
   * user of the PWA know that there is a
   * new version available. When they click the
   * reload button it then reloads the page
   * so that the new service worker can take over
   * and serve the fresh content
   */
  @Listen('window:swUpdate')
  async onSWUpdate() {
    const toast = await this.toastCtrl.create({
      message        : 'New version available',
      showCloseButton: true,
      closeButtonText: 'Reload',
    });
    await toast.present();
    await toast.onWillDismiss();
    window.location.reload();
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url='/' component='app-home'></ion-route>
          <ion-route url='/profile/:name' component='app-profile'></ion-route>
        </ion-router>
        <ion-nav></ion-nav>
      </ion-app>
    );
  }
}

