import type { Directive } from 'vue';

const grabScrollDirective: Directive<HTMLElement & { __grabScroll?: InstanceType<typeof GrabScroll> }> = {
  mounted(el, binding) {
    const instance = new GrabScroll({
      el,
      wheelEvent: binding.value?.wheelEvent ?? true,
    });
    instance.init();
    el.__grabScroll = instance;
  },
  unmounted(el) {
    el.__grabScroll?.destroy();
    delete el.__grabScroll;
  },
};

export const grabScroll = ['grabScroll', grabScrollDirective] as const;

class GrabScroll {
  private startX = 0;
  private scrollLeft = 0;
  private isDragging = false;
  private readonly $element: HTMLElement;
  private readonly listeners: Array<[string, EventListener]>;

  constructor(options: { el: HTMLDivElement; wheelEvent?: boolean }) {
    this.$element = options.el;
    this.listeners = [
      ['mousedown', this.mouseDown],
      ['mousemove', this.mouseMove],
      ['mouseup', this.mouseUp],
      ['mouseleave', this.mouseUp],
    ];

    if (options.wheelEvent) {
      this.listeners.push([/Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel', this.mouseWheel]);
    }
  }

  private mouseDown = (e: MouseEvent) => {
    e.preventDefault();
    this.isDragging = true;
    this.startX = e.pageX;
    this.scrollLeft = this.$element.scrollLeft;
    this.$element.style.cursor = 'grabbing';
  };

  private mouseMove = (e: MouseEvent) => {
    if (!this.isDragging) return;
    e.preventDefault();
    e.stopPropagation(); // предотвращаем клики на детях
    const walk = this.startX - e.pageX;
    this.$element.scrollLeft = this.scrollLeft + walk;
  };

  private mouseUp = () => {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.$element.style.cursor = 'grab';
  };

  private mouseWheel = (e: WheelEvent & { wheelDelta?: number }) => {
    if (this.isDragging) return;
    e.preventDefault();
    const delta = Math.max(-1, Math.min(1, e.wheelDelta ?? -e.detail)) * 100;
    this.$element.scrollLeft -= delta;
  };

  public init() {
    this.$element.style.cursor = 'grab';
    this.listeners.forEach(([event, handler]) => this.$element.addEventListener(event, handler, { passive: false }));
  }

  public destroy() {
    this.listeners.forEach(([event, handler]) => this.$element.removeEventListener(event, handler));
    this.$element.style.cursor = '';
  }
}
