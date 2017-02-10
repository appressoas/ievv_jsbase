import "babel-polyfill";
import "./polyfill/all";
import SignalHandlerSingleton from "./SignalHandlerSingleton";
import WidgetRegistrySingleton from "./widget/WidgetRegistrySingleton";
import LoggerSingleton from "./log/LoggerSingleton";
import LOGLEVEL from "./log/loglevel";

window.ievv_jsbase_core = {
    SignalHandlerSingleton: SignalHandlerSingleton,
    WidgetRegistrySingleton: WidgetRegistrySingleton,
    LoggerSingleton: LoggerSingleton,
    LOGLEVEL: LOGLEVEL
};
