import {Address, toNano} from '@ton/core';
import {Proxy} from '../wrappers/Proxy';
import {compile, NetworkProvider} from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const proxy = provider.open(Proxy.createFromConfig({
        owner: provider.sender().address as Address,
    }, await compile('Proxy')));

    await proxy.sendDeploy(provider.sender(), toNano('0.01'));

    await provider.waitForDeploy(proxy.address);

    // run methods on `proxy`
}
