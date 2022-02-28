import { database } from "./firebase"
import { onValue, ref, set, child } from "firebase/database";


function Subcriber() {
    this.onMap = {};
    this.onceMap = {};
    this.dataMap = {};
    this.pipeList = [];

    this.next = (event, data) => {
        this.dataMap[event] = data;
        if (this.onMap[event]) {
            for (const cb of this.onMap[event]){
                cb(data);
            }
        }
        if (this.onceMap[event]) {
            for (const index in this.onceMap[event]){
                if (this.onceMap[event][index]){
                    this.onceMap[event][index](data);
                    this.onceMap[event][index] = undefined;
                }
            }
        }
        for (let cc of this.pipeList){
            cc.write(data);
            // cc.emit();
        }
    };

    this.on = (event, cb) => {
        this.onMap[event] = this.onMap[event] || [];
        this.onMap[event].push(cb);
        if (this.dataMap[event]){
            cb(this.dataMap[event])
        }
        return this;
    };

    this.once = (event, cb) => {
        this.onceMap[event] = this.onceMap[event] || [];
        this.onceMap[event].push(cb);
        if (this.dataMap[event]){
            cb(this.dataMap[event])
        }
        return this;
    };

    this.pipe = (abc) => {
        console.log("pipe", {abc});
        this.pipeList.push(abc);
    };
}

export class custom_signalhub {
    constructor(app) {
        app = app.replace("/", "_")
        console.log("init signalhub:", app);
        this.app = app;
        this.ref = ref(database, 'signal/' + app);

        this.subscribe = (chanel) => {
            let subcriber = new Subcriber();
            subcriber.next('open');

            onValue(child(this.ref, chanel), (snapshot) => {
                const data = snapshot.val();
                console.log({data});
                if (data){
                    subcriber.next('data', data);
                }
              });
            return subcriber;
        };

        this.broadcast = (chanel, message, cb) => {
            set(child(this.ref, chanel), message)
                .then(() => {
                    if (cb) {
                        cb();
                    }
                });
        };

        this.close = () => {
            // do nothing now
        };
    }
}