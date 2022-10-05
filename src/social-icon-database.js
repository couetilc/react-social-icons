import { init } from './networks'

const SocialIconDatabase = {
  networks: {},
  importNetwork(network) {
    this.networks[network.name] = network
    init(this.networks)
    return this
  },
  importNetworks(networks) {
    networks.forEach((network) => {
      this.networks[network.name] = network
    })
    init(this.networks)
    return this
  },
}

export { SocialIconDatabase }
