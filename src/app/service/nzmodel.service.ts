import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { Injector, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ConfirmType, ModalOptions, NzModalRef } from 'ng-zorro-antd/modal';

export declare class NzModalService implements OnDestroy {
    private overlay;
    private injector;
    private nzConfigService;
    private parentModal;
    private directionality;
    private openModalsAtThisLevel;
    private readonly afterAllClosedAtThisLevel;
    get openModals(): NzModalRef[];
    get _afterAllClosed(): Subject<void>;
    readonly afterAllClose: Observable<void>;
    constructor(overlay: Overlay, injector: Injector, nzConfigService: NzConfigService, parentModal: NzModalService, directionality: Directionality);
    create<T, R = NzSafeAny>(config: ModalOptions<T, R>): NzModalRef<T, R>;
    closeAll(): void;
    confirm<T>(options?: ModalOptions<T>, confirmType?: ConfirmType): NzModalRef<T>;
    info<T>(options?: ModalOptions<T>): NzModalRef<T>;
    success<T>(options?: ModalOptions<T>): NzModalRef<T>;
    error<T>(options?: ModalOptions<T>): NzModalRef<T>;
    warning<T>(options?: ModalOptions<T>): NzModalRef<T>;
    private open;
    private removeOpenModal;
    private closeModals;
    private createOverlay;
    private attachModalContainer;
    private attachModalContent;
    private createInjector;
    private confirmFactory;
    ngOnDestroy(): void;
}