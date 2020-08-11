const PromiseIPC = require('electron-promise-ipc')
/**
 * Section of code to translate IPC promise calls to and from renderer and main prcoess/core bundle.
 */
class ipcAdapter {
    constructor(core) {
        this.core = core;
    }
    start() {
        //distillerDb
        PromiseIPC.on("distiller.fetch", async (reflink) => {
            return await this.core.distillerDB.fetch(reflink);
        })
        PromiseIPC.on("distiller.getTag", async (tag, options) => {
            return await this.core.distillerDB.getTag(tag, options);
        })
        PromiseIPC.on("distiller.getContent", async (reflink, options) => {
            return await this.core.distillerDB.getContent(reflink, options);
        })
        PromiseIPC.on("distiller.getPosts", async (reflink, options) => {
            return await this.core.distillerDB.getPosts(reflink, options);
        })
        PromiseIPC.on("distiller.getChildren", async (reflink, options) => {
            return await this.core.distillerDB.getChildren(reflink, options);
        })
        PromiseIPC.on("distiller.getAccount", async (reflink, options) => {
            return await this.core.distillerDB.getAccount(reflink, options);
        })
        PromiseIPC.on("distiller.getState", async (stateKey) => {
            return await this.core.distillerDB.getState(stateKey);
        })
        //Blocklist
        PromiseIPC.on("blocklist.add", async (reflink, options) => {
            return await this.core.blocklist.add(reflink, options);
        })
        PromiseIPC.on("blocklist.has", async (reflink) => {
            return await this.core.blocklist.has(reflink);
        })
        PromiseIPC.on("blocklist.rm", async (reflink) => {
            return await this.core.blocklist.rm(reflink);
        })
        PromiseIPC.on("blocklist.ls", async (query) => {
            return await this.core.blocklist.rm(query);
        })
    }
}
module.exports = ipcAdapter;