# One-use Actor Component

**Request:** "Move this Actor's five-line door-open behavior into a reusable
component."

## Ponytail UE5.7

Keep it in the Actor when there is one door type and one consumer. A component
adds a reflected type, registration/lifecycle, another source pair, editor
surface, and ownership questions.

Extract only when at least one real condition exists:

- a second unrelated Actor needs the behavior;
- designers need independent composition/activation;
- replication or lifecycle is genuinely component-scoped;
- the existing project architecture already standardizes this behavior as a component.

`// ponytail: one owner; upgrade to a component when a second unrelated Actor needs composition`
