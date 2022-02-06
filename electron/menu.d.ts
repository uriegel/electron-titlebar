declare const electron: any;
interface Window {
    onRename: () => void;
    onExtendedRename: () => void;
    onCopy: () => void;
    onMove: () => void;
    onDarkTheme: (isChecked: boolean) => void;
    onClose: () => void;
    close: () => void;
    onHidden: (isChecked: boolean) => void;
    onDevTools: () => void;
}
