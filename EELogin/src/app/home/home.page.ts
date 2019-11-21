import { Component, OnInit, OnDestroy } from '@angular/core';

import { Plugins, NetworkStatus } from '@capacitor/core';
import { PluginListenerHandle } from '@capacitor/core/dist/esm/web/network';

const { Network } = Plugins;


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  networkListener: PluginListenerHandle;
  networkStatus: NetworkStatus;

  async ngOnInit(){
    this.networkListener = Network.addListener(
      'networkStatusChange', 
      status => {
      console.log('Network status changed', status);
      this.networkStatus = status;
    },
    );
    this.networkStatus = await Network.getStatus();
  }

  ngOnDestroy(): void {
    this.networkListener.remove();

  }


  constructor() { }

  

}
