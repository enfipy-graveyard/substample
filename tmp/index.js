const { ApiPromise, WsProvider } = require("@polkadot/api");
const { Struct } = require("@polkadot/types/codec");
const { getTypeRegistry, u32, Vector } = require("@polkadot/types");

class VecU32 extends Vector.with(u32) {}

class Kind extends Struct {
  constructor(value) {
    super(
      {
        stuff: VecU32
      },
      value
    );
  }

  get stuff() {
    return this.get("stuff");
  }
}

const Alice = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";

const connect = async () => {
  try {
    const provider = new WsProvider("ws://127.0.0.1:9944");

    const typeRegistry = getTypeRegistry();
    typeRegistry.register({ Kind });

    const api = await ApiPromise.create(provider);

    const now = await api.query.timestamp.now();
    console.log(now);

    const res = await api.query.template.kinds(Alice);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

connect();
