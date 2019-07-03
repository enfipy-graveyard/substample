<template>
  <div class="container">
    <div>
      <h1 class="title">Substample</h1>
      <button @click="connect">Connect</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Struct } from "@polkadot/types/codec";
import { getTypeRegistry, u32, Vector } from "@polkadot/types";

class VecU32 extends Vector.with(u32) {}

type KindType = {
  stuff: VecU32;
};

class Kind extends Struct {
  constructor(value?: KindType) {
    super(
      {
        stuff: VecU32
      },
      value
    );
  }

  get stuff(): VecU32 {
    return this.get("stuff") as VecU32;
  }
}

const Alice = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";

export default {
  data() {
    return {
      api: null
    };
  },
  methods: {
    async connect() {
      try {
        const provider = new WsProvider("ws://127.0.0.1:9944");

        const typeRegistry = getTypeRegistry();
        typeRegistry.register({ Kind });

        const api = await ApiPromise.create(provider);

        // With types providede in create - works
        // {
        //   Kind: {
        //     stuff: "Vec<u32>"
        //   }
        // }

        console.log(api.query);

        const now = await api.query.timestamp.now();
        console.log(now);

        const res = await api.query.templateModule.kinds(Alice);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style>
.container {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;

  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
  padding-bottom: 5px;
}
</style>
