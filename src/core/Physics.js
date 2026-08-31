/**
 * Physics Engine & AABB Collision System
 * Purpose: Provides fast bounding box intersection math and discrete overlap rejection.
 */

export class Rect {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get left() { return this.x; }
  get right() { return this.x + this.width; }
  get top() { return this.y; }
  get bottom() { return this.y + this.height; }
}

export class Physics {
  /**
   * Axis-Aligned Bounding Box (AABB) Collision Check.
   * Executed on entities in the Doubly Linked List that possess hitboxes.
   * @param {Rect} rect1 
   * @param {Rect} rect2 
   * @returns {boolean}
   */
  static checkAABB(rect1, rect2) {
    if (!rect1 || !rect2) return false;
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  /**
   * Calculates minimum penetration resolution vector to resolve overlaps.
   * @param {Rect} dynamicRect Moving entity
   * @param {Rect} staticRect Wall/Platform
   * @returns {{x: number, y: number}} Penetration adjustment vector
   */
  static resolveAABB(dynamicRect, staticRect) {
    const overlapX1 = staticRect.right - dynamicRect.left;
    const overlapX2 = dynamicRect.right - staticRect.left;
    const overlapY1 = staticRect.bottom - dynamicRect.top;
    const overlapY2 = dynamicRect.bottom - staticRect.top;

    const minX = overlapX1 < overlapX2 ? overlapX1 : -overlapX2;
    const minY = overlapY1 < overlapY2 ? overlapY1 : -overlapY2;

    if (Math.abs(minX) < Math.abs(minY)) {
      return { x: minX, y: 0 };
    } else {
      return { x: 0, y: minY };
    }
  }

  /**
   * Clamps coordinates within Canvas boundaries.
   * @param {{x: number, y: number, width: number, height: number}} entity 
   * @param {number} canvasWidth 
   * @param {number} canvasHeight 
   */
  static clampToBounds(entity, canvasWidth, canvasHeight) {
    if (entity.x < 0) entity.x = 0;
    if (entity.x + entity.width > canvasWidth) entity.x = canvasWidth - entity.width;
    if (entity.y < 0) entity.y = 0;
    if (entity.y + entity.height > canvasHeight) entity.y = canvasHeight - entity.height;
  }
}
