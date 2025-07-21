# Dialog Component Specifications

## Triangle Element Reference (Persona 3 Style)

Based on the Persona 3 dialog reference image, the triangle accent element should have the following specifications:

### Position

- **Location**: Top-left corner of dialog
- **Overflow**: Extends significantly beyond dialog boundaries
- **Positioning**: Approximately 60-80px from top, 80-100px from left edge

### Dimensions

- **Width**: ~200px
- **Height**: ~100px
- **Shape**: Horizontal triangle, wider than it is tall
- **Aspect Ratio**: Approximately 2:1 (width to height)

### Visual Properties

- **Color**: Bright blue (#0080FF or #007FFF) - vibrant, high saturation
- **Style**: Solid fill, no transparency
- **Edges**: Sharp, clean lines with no blur or softness
- **Shadow**: Optional subtle drop shadow

### Geometry

- **Direction**: Points leftward and slightly upward
- **Angle**: Creates an arrow-like shape pointing out from dialog
- **Shape**: Sharp triangle with three distinct points
- **Rotation**: Rotated to create dynamic, angled appearance

### Purpose

- Acts as a visual accent that extends dialog's presence
- Creates dynamic, modern gaming UI aesthetic
- Provides visual interest and depth to dialog design
- Matches Persona 3's distinctive UI style

### Z-Index Layering

1. Dialog background shadow (lowest)
2. Dialog main background
3. Triangle accent element
4. Dialog content text (highest)

## Current Implementation Status

- [x] Basic triangle shape created
- [x] Positioning in top-left corner
- [x] Z-index layering established
- [ ] Color brightness adjustment needed
- [ ] Size and proportions need refinement
- [ ] Angle/rotation adjustment required
