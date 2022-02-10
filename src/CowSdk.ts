import { version as SDK_VERSION } from '../package.json'
import { CowApi } from './api'
import { SupportedChainId as ChainId } from '/constants/chains'
import { validateAppDataDocument } from '/utils/appData'
import { Context, CowContext } from '/utils/context'
import { signOrder, signOrderCancellation, UnsignedOrder } from '/utils/sign'

export class CowSdk<T extends ChainId> {
  static version = SDK_VERSION
  chainId: T
  context: Context
  cowApi: CowApi<T>

  constructor(chainId: T, cowContext: CowContext = {}) {
    this.chainId = chainId
    this.context = new Context(cowContext)
    this.cowApi = new CowApi(chainId, this.context)
  }

  validateAppDataDocument = validateAppDataDocument

  signOrder(order: Omit<UnsignedOrder, 'appData'>) {
    return signOrder({ ...order, appData: this.context.appDataHash }, this.chainId, this.context.signer)
  }

  signOrderCancellation(orderId: string) {
    return signOrderCancellation(orderId, this.chainId, this.context.signer)
  }
}

export default CowSdk
