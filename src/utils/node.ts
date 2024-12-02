export interface NodeInterface {
    value: number;
    next: NodeInterface | null;
}

export const createNode = (value: number): NodeInterface => ({
    value,
    next: null,
});

export interface DoublyNode {
    value: number;
    next: DoublyNode | null;
    prev: DoublyNode | null;
}

export const createDoublyNode = (value: number): DoublyNode => ({
    value,
    next: null,
    prev: null,
});