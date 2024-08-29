import {Address, beginCell, toNano} from '@ton/core';
import {Proxy} from '../wrappers/Proxy';
import {compile, NetworkProvider} from '@ton/blueprint';


export async function run(provider: NetworkProvider) {
    const proxy = provider.open(Proxy.createFromConfig({
        owner: provider.sender().address as Address,
    }, await compile('Proxy')));

    await provider.sender().send({
        to: proxy.address,
        value: toNano('0.001'),
        body: beginCell().storeStringTail('Hello, Baice Lee on Ton Network ').endCell(),
    })
}