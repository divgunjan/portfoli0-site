import numpy as np


def mse_loss(input: np.ndarray, target: np.ndarray, reduction: str = "mean") -> float | np.ndarray:
    """
    input:     shape matching target, any shape
    target:    shape matching input, any shape
    reduction: 'mean' | 'sum' | 'none'

    Returns:
        a Python float when reduction is 'mean' or 'sum';
        an array shaped like input when reduction is 'none'
    """
    # TODO: Implement mean squared error from Theory.
    # Branch on `reduction` explicitly. Raise ValueError for anything else.

    sq_err = (input-target)**2

    if reduction == 'sum':
        return float(np.sum(sq_err))
    elif reduction == 'mean':
        return float(np.mean(sq_err))
    elif reduction is 'none':
        return sq_err
    else:
        raise ValueError("Value error")
