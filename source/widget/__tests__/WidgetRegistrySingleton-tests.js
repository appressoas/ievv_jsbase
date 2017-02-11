import WidgetRegistrySingleton from "../WidgetRegistrySingleton";
import {ElementIsNotWidgetError} from "../WidgetRegistrySingleton";
import {InvalidWidgetAliasError} from "../WidgetRegistrySingleton";
import AbstractWidget from "../AbstractWidget";
import HtmlParser from "../../dom/HtmlParser";
import {ElementHasNoWidgetInstanceIdError} from "../WidgetRegistrySingleton";
import {ElementIsNotInitializedAsWidget} from "../WidgetRegistrySingleton";


class MockWidget extends AbstractWidget {
    constructor(element) {
        super(element);
        this._onDestroy = jest.fn();
    }

    destroy() {
        this._onDestroy();
    }
}


describe('WidgetRegistrySingleton', () => {
    beforeEach(() => {
        new WidgetRegistrySingleton().clear();
    });

    it('WidgetRegistrySingleton.registerWidgetClass()', () => {
        let mockWidget = jest.fn();
        let widgetRegistry = new WidgetRegistrySingleton();
        widgetRegistry.registerWidgetClass('test', mockWidget);
        expect(widgetRegistry._widgetClassMap.has('test')).toBe(true);
        expect(widgetRegistry._widgetClassMap.get('test')).toBe(mockWidget);
    });

    it('WidgetRegistrySingleton.registerWidgetClass() replaces', () => {
        let mockWidget1 = jest.fn();
        let mockWidget2 = jest.fn();
        let widgetRegistry = new WidgetRegistrySingleton();
        widgetRegistry.registerWidgetClass('test', mockWidget1);
        widgetRegistry.registerWidgetClass('test', mockWidget2);
        expect(widgetRegistry._widgetClassMap.has('test')).toBe(true);
        expect(widgetRegistry._widgetClassMap.get('test')).toBe(mockWidget2);
    });

    it('WidgetRegistrySingleton.removeWidgetClass() does nothing if it does not exist', () => {
        let widgetRegistry = new WidgetRegistrySingleton();
        widgetRegistry.removeWidgetClass('test');
    });

    it('WidgetRegistrySingleton.removeWidgetClass() removes', () => {
        let widgetRegistry = new WidgetRegistrySingleton();
        widgetRegistry.registerWidgetClass('test', jest.fn());
        expect(widgetRegistry._widgetClassMap.has('test')).toBe(true);
        widgetRegistry.removeWidgetClass('test');
        expect(widgetRegistry._widgetClassMap.has('test')).toBe(false);
    });

    it('WidgetRegistrySingleton.initializeWidget() ElementIsNotWidgetError', () => {
        let widgetRegistry = new WidgetRegistrySingleton();
        let element = new HtmlParser('<div></div>').firstRootElement;
        expect(() => widgetRegistry.initializeWidget(element)).toThrowError(ElementIsNotWidgetError);
    });

    it('WidgetRegistrySingleton.initializeWidget() ElementIsNotWidgetError', () => {
        let widgetRegistry = new WidgetRegistrySingleton();
        let element = new HtmlParser('<div data-ievv-jsbase-widget="test"></div>').firstRootElement;
        expect(() => widgetRegistry.initializeWidget(element)).toThrowError(InvalidWidgetAliasError);
    });

    it('WidgetRegistrySingleton.initializeWidget()', () => {
        let widgetRegistry = new WidgetRegistrySingleton();
        widgetRegistry.registerWidgetClass('test', MockWidget);
        widgetRegistry._widgetInstanceCounter = 0;
        let element = new HtmlParser('<div data-ievv-jsbase-widget="test"></div>').firstRootElement;
        let widget = widgetRegistry.initializeWidget(element);
        expect(widget.element).toBe(element);
        expect(element.getAttribute('data-ievv-jsbase-widget-instanceid')).toBe('1');
    });

    it('WidgetRegistrySingleton.initializeAllWidgetsWithinElement() adds to widgetInstanceMap', () => {
        let widgetRegistry = new WidgetRegistrySingleton();
        widgetRegistry.registerWidgetClass('test', MockWidget);
        widgetRegistry._widgetInstanceCounter = 0;
        let rootElement = new HtmlParser(`<div>
            <div data-ievv-jsbase-widget="test"></div>
        </div>`).firstRootElement;
        widgetRegistry.initializeAllWidgetsWithinElement(rootElement);
        expect(widgetRegistry._widgetInstanceMap.size).toBe(1);
        let createdWidget = widgetRegistry._widgetInstanceMap.get('1');
        expect(createdWidget.element).toBe(rootElement.children[0]);
    });

    it('WidgetRegistrySingleton.initializeAllWidgetsWithinElement() sets instanceid element attribute', () => {
        let widgetRegistry = new WidgetRegistrySingleton();
        widgetRegistry.registerWidgetClass('test', MockWidget);
        widgetRegistry._widgetInstanceCounter = 0;
        let rootElement = new HtmlParser(`<div>
            <div data-ievv-jsbase-widget="test"></div>
        </div>`).firstRootElement;
        widgetRegistry.initializeAllWidgetsWithinElement(rootElement);
        expect(rootElement.children[0].getAttribute('data-ievv-jsbase-widget-instanceid')).toBe('1');
    });

    it('WidgetRegistrySingleton.initializeAllWidgetsWithinElement() multiple elements', () => {
        let widgetRegistry = new WidgetRegistrySingleton();
        widgetRegistry.registerWidgetClass('test', MockWidget);
        widgetRegistry.registerWidgetClass('test2', MockWidget);
        widgetRegistry.registerWidgetClass('test3', MockWidget);
        widgetRegistry._widgetInstanceCounter = 0;
        let rootElement = new HtmlParser(`<div>
            <div data-ievv-jsbase-widget="test"></div>
            <div data-ievv-jsbase-widget="test"></div>
            <section>
                <h2>Hello world</h2>
                <div data-ievv-jsbase-widget="test2">
                    <div data-ievv-jsbase-widget="test3"></div>
                </div>
            </section>
        </div>`).firstRootElement;
        widgetRegistry.initializeAllWidgetsWithinElement(rootElement);
        expect(widgetRegistry._widgetInstanceMap.size).toBe(4);
        expect(rootElement.children[0].getAttribute('data-ievv-jsbase-widget-instanceid')).toBe('1');
    });

    it('WidgetRegistrySingleton.destroyWidget() ElementHasNoWidgetInstanceIdError', () => {
        let widgetRegistry = new WidgetRegistrySingleton();
        let widgetElement = new HtmlParser(`<div data-ievv-jsbase-widget="test"></div>`).firstRootElement;
        expect(() => widgetRegistry.destroyWidget(widgetElement)).toThrowError(ElementHasNoWidgetInstanceIdError);
    });

    it('WidgetRegistrySingleton.destroyWidget() ElementIsNotInitializedAsWidget', () => {
        let widgetRegistry = new WidgetRegistrySingleton();
        let widgetElement = new HtmlParser(
            `<div data-ievv-jsbase-widget="test" data-ievv-jsbase-widget-instanceid="invalid"></div>`).firstRootElement;
        expect(() => widgetRegistry.destroyWidget(widgetElement)).toThrowError(ElementIsNotInitializedAsWidget);
    });

    it('WidgetRegistrySingleton.destroyWidget() updates _widgetInstanceMap', () => {
        let widgetRegistry = new WidgetRegistrySingleton();
        widgetRegistry.registerWidgetClass('test', MockWidget);
        let widgetElement = new HtmlParser(`<div data-ievv-jsbase-widget="test"></div>`).firstRootElement;
        widgetRegistry.initializeWidget(widgetElement);
        expect(widgetRegistry._widgetInstanceMap.size).toBe(1);
        widgetRegistry.destroyWidget(widgetElement);
        expect(widgetRegistry._widgetInstanceMap.size).toBe(0);
    });

    it('WidgetRegistrySingleton.destroyWidget() calls widget.destroy()', () => {
        let widgetRegistry = new WidgetRegistrySingleton();
        widgetRegistry.registerWidgetClass('test', MockWidget);
        let widgetElement = new HtmlParser(`<div data-ievv-jsbase-widget="test"></div>`).firstRootElement;
        widgetRegistry.initializeWidget(widgetElement);
        let widget = widgetRegistry.getWidgetInstanceByInstanceId(
            widgetRegistry.getWidgetInstanceIdFromElement(widgetElement));
        widgetRegistry.destroyWidget(widgetElement);
        expect(widget._onDestroy).toHaveBeenCalledTimes(1);
    });

    it('WidgetRegistrySingleton.destroyWidget() removes -instanceid attribute', () => {
        let widgetRegistry = new WidgetRegistrySingleton();
        widgetRegistry.registerWidgetClass('test', MockWidget);
        let widgetElement = new HtmlParser(`<div data-ievv-jsbase-widget="test"></div>`).firstRootElement;
        widgetRegistry.initializeWidget(widgetElement);
        expect(widgetElement.hasAttribute('data-ievv-jsbase-widget-instanceid')).toBe(true);
        widgetRegistry.destroyWidget(widgetElement);
        expect(widgetElement.hasAttribute('data-ievv-jsbase-widget-instanceid')).toBe(false);
    });

    it('WidgetRegistrySingleton.destroyAllWidgetsWithinElement()', () => {
        let widgetRegistry = new WidgetRegistrySingleton();
        widgetRegistry.registerWidgetClass('test1', MockWidget);
        widgetRegistry.registerWidgetClass('test2', MockWidget);
        widgetRegistry.registerWidgetClass('test3', MockWidget);
        let rootElement = new HtmlParser(`<div>
            <div data-ievv-jsbase-widget="test1"></div>
            <section id="id_section">
                <div data-ievv-jsbase-widget="test2">
                    <div data-ievv-jsbase-widget="test3"></div>
                </div>
            </section>
        </div>`).firstRootElement;
        widgetRegistry.initializeAllWidgetsWithinElement(rootElement);
        expect(widgetRegistry._widgetInstanceMap.size).toBe(3);
        let sectionElement = rootElement.querySelector('#id_section');
        widgetRegistry.destroyAllWidgetsWithinElement(sectionElement);
        expect(widgetRegistry._widgetInstanceMap.size).toBe(1);
    });
});
