import { ApiPromise, WsProvider } from "@polkadot/api";
import { Struct } from "@polkadot/types/codec";
import { getTypeRegistry, u32, Vector } from "@polkadot/types";

const VecU32 = Vector.with(u32);

const Kind = Struct.with({
  stuff: VecU32
});

// const kindExample = new Kind({ stuff: new VecU32([1, 3, 5]) });
// console.log(kindExample);

const Alice = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";

export default async () => {
  try {
    const provider = new WsProvider("ws://127.0.0.1:9944");

    const typeRegistry = getTypeRegistry();
    typeRegistry.register({ Kind });

    const api = await ApiPromise.create(provider);

    console.log(api.query);

    const now = await api.query.timestamp.now();
    console.log(now);

    const res: any = await api.query.template.kinds(Alice);
    console.log(res.stuff);
  } catch (err) {
    console.error(err);
  }
};
