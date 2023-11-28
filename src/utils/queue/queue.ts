class Node<T extends unknown> {
  data: T;
  next: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

export class Queue<T extends unknown> {
  private root: Node<T> | null;
  private last: Node<T> | null;

  constructor() {
    this.root = null;
    this.last = null;
  }

  get toastDatalist(): T[] {
    let rootNode = this.root;

    if (rootNode === null) {
      return [];
    }

    let currentNode = rootNode;
    let array: T[] = [currentNode.data];

    while (currentNode.next !== null) {
      currentNode = currentNode.next;
      array.push(currentNode.data);
    }

    return array;
  }

  enqueue(data: T) {
    let insertData = new Node(data);

    if (this.root === null || this.last === null) {
      this.root = insertData;
      this.last = insertData;
    } else {
      let lastNode = this.last;
      this.last = insertData;
      lastNode.next = insertData;
    }
  }

  dequeue() {
    if (this.root === null || this.last === null) {
      return null;
    }

    let deleteNode = this.root;
    this.root = deleteNode.next;
    return deleteNode;
  }

  size() {
    let rootNode = this.root;

    if (rootNode === null) {
      return 0;
    }

    let currentNode = rootNode;
    let index = 1;

    while (currentNode.next !== null) {
      currentNode = currentNode.next;
      index += 1;
    }

    return index;
  }

  empty() {
    return this.root === null && this.last === null;
  }
}
