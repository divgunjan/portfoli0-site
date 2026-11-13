import numpy as np
def gd_step(
    weight: np.ndarray,
    bias: np.ndarray | None,
    grad_weight: np.ndarray,
    grad_bias: np.ndarray | None,
    lr: float,
) -> tuple[np.ndarray, np.ndarray | None]:
    """
    Apply one gradient-descent update.

    Returns:
        updated_weight, updated_bias
    """
    # TODO: Implement the update rule from Theory.
    # Return new values -- do not mutate weight or bias in place.
    # bias=None means there's no bias parameter -- updated_bias stays None.

    # single iteration

    updated_weight  = weight - lr*grad_weight
    updated_bias = 0
    if bias is None:
        updated_bias = None
    else:
        updated_bias = bias-lr*grad_bias
        
    return (updated_weight, updated_bias)
